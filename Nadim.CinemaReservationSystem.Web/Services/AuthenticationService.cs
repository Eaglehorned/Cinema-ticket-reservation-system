using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Nadim.CinemaReservationSystem.Web.Contracts;

namespace Nadim.CinemaReservationSystem.Web.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private bool UserExists(CinemaReservationSystemContext dbContext, string userEmail)
        {
            return dbContext.Users.Any(u => u.Email == userEmail);
        }

        private bool InputLoginDataValid(UserLoginInfo user)
        {
            return Utils.IsEmailValid(user.Email) && !string.IsNullOrEmpty(user.Password);
        }

        private bool InputRegistrationDataValid(UserRegistrationInfo user)
        {
            return Utils.IsEmailValid(user.Email) && !string.IsNullOrEmpty(user.Password) && !string.IsNullOrEmpty(user.FirstName) && !string.IsNullOrEmpty(user.LastName);
        }

        private bool IsUserDataCorrect(CinemaReservationSystemContext dbContext, UserLoginInfo user)
        {
            return Utils.GetHash(user.Password) == dbContext.Users.First(u => u.Email == user.Email).Password;
        }

        private string GenerateToken(IConfiguration configuration, string userEmail)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(ClaimTypes.Name, userEmail)
            };

            var token = new JwtSecurityToken(
                issuer: configuration["Tokens:Issuer"],
                audience: configuration["Tokens:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public Result Login(CinemaReservationSystemContext dbContext, IConfiguration configuration, UserLoginInfo user)
        {
            if (!InputLoginDataValid(user))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Incorrect data."
                };
            }

            if (!UserExists(dbContext, user.Email))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "User doesnt exist."
                };
            }

            if (!IsUserDataCorrect(dbContext, user))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Incorrect password."
                };
            }

            return new LoginResult
            {
                ResultOk = true,
                Details = dbContext.Users.First(u => u.Email == user.Email).FirstName +
                    " " + dbContext.Users.First(u => u.Email == user.Email).LastName,
                Token = GenerateToken(configuration, user.Email)
            };
        }

        public Result Register(CinemaReservationSystemContext dbContext, IConfiguration configuration, UserRegistrationInfo user)
        {
            if (!InputRegistrationDataValid(user))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Incorrect data."
                };
            }

            if (UserExists(dbContext, user.Email))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "User already registed."
                };
            }

            dbContext.Users.Add(new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = Utils.GetHash(user.Password),
                Email = user.Email,
                Role = "user"
            });

            dbContext.SaveChanges();

            return new RegistrationResult
            {
                ResultOk = true,
                Token = GenerateToken(configuration, user.Email)
            };
        }
    }
}
