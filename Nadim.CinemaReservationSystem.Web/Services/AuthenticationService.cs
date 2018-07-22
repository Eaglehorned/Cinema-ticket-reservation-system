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

namespace Nadim.CinemaReservationSystem.Web.Services
{
    public static class AuthenticationService
    {
        public static bool UserExists(CinemaReservationSystemContext dbContext, string userEmail)
        {
            return dbContext.Users.Any(u => u.Email == userEmail);
        }

        public static bool IsUserLoginDataValid(UserLoginInfo user)
        {
            return Utils.IsEmailValid(user.Email) || string.IsNullOrEmpty(user.Password);
        }

        public static bool IsUserRegistrationDataValid(UserRegistrationInfo user) {
            return Utils.IsEmailValid(user.Email) || string.IsNullOrEmpty(user.Password) || string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName);
        }

        public static bool IsUserDataCorrect(CinemaReservationSystemContext dbContext, UserLoginInfo user) {
            return Utils.GetHash(user.Password) == dbContext.Users.First(u => u.Email == user.Email).Password;
        }

        public static string GenerateToken(IConfiguration configuration, string userEmail) {
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
    }
}
