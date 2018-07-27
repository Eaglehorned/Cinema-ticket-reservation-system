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
        private readonly IConfiguration configuration;
        private readonly CinemaReservationSystemContext dbContext;

        public AuthenticationService(IConfiguration configuration, CinemaReservationSystemContext dbContext)
        {
            this.configuration = configuration;
            this.dbContext = dbContext;
        }

        private bool UserExists(string userEmail)
        {
            return dbContext.Users.Any(u => u.Email == userEmail);
        }

        private bool InputLoginDataValid(UserLoginInfo user)
        {
            return Utils.IsEmailValid(user.Email) && !string.IsNullOrEmpty(user.Password);
        }

        private bool InputRegistrationDataValid(UserRegistrationInfo user)
        {
            return Utils.IsEmailValid(user.Email) &&
                !string.IsNullOrEmpty(user.Password) &&
                !string.IsNullOrEmpty(user.FirstName) &&
                !string.IsNullOrEmpty(user.LastName) &&
                !string.IsNullOrEmpty(user.UserName);
        }

        private bool IsUserDataCorrect(UserLoginInfo user)
        {
            return Utils.GetHash(user.Password) == dbContext.Users.First(u => u.Email == user.Email).Password;
        }

        private bool UserNameUsed(string userName)
        {
            return dbContext.Users.Any(u => u.UserName == userName);
        }

        private string GenerateToken(string userEmail)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            Claim[] claims;

            claims = new[] {
                new Claim(ClaimTypes.Name, userEmail),
                new Claim(ClaimTypes.Role, dbContext.Users.FirstOrDefault(u => u.Email == userEmail).Role)
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

        public Result Login(UserLoginInfo user)
        {
            if (!InputLoginDataValid(user))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Incorrect data."
                };
            }

            if (!UserExists(user.Email))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "User doesnt exist."
                };
            }

            if (!IsUserDataCorrect(user))
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
                FullUserName = dbContext.Users.First(u => u.Email == user.Email).UserName,
                Token = GenerateToken(user.Email)
            };
        }

        public Result Register(UserRegistrationInfo user)
        {
            if (!InputRegistrationDataValid(user))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Incorrect data."
                };
            }

            if (UserExists(user.Email))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "User with such e-mail already registed."
                };
            }

            if (UserNameUsed(user.UserName))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "User with such username already registed."
                };
            }

            dbContext.Users.Add(new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = Utils.GetHash(user.Password),
                Email = user.Email,
                Role = "user",
                UserName = user.UserName
            });

            dbContext.SaveChanges();

            return new RegistrationResult
            {
                ResultOk = true,
                Token = GenerateToken(user.Email)
            };
        }
    }
}
