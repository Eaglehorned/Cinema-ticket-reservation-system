using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nadim.CinemaReservationSystem.Web.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace Nadim.CinemaReservationSystem.Web.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly CinemaReservationSystemContext dbContext;
        public readonly IConfiguration configuration;
        public AuthenticationController(CinemaReservationSystemContext context, IConfiguration configuration)
        {
            dbContext = context;
            this.configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Login([FromBody] User user)
        {
            if (!Regex.IsMatch(user.Email, @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$") ||
                string.IsNullOrEmpty(user.Password))
            {
                return Json(new Response
                {
                    Status = "error",
                    Details = "Incorrect data."
                });
            }

            if (!dbContext.Users.Any(u => u.Email == user.Email))
            {
                return Json(new Response
                {
                    Status = "error",
                    Details = "User doesnt exist."
                });
            }

            if (Utils.GetHash(user.Password) != dbContext.Users.First(u => u.Email == user.Email).Password)
            {
                return Json(new Response
                {
                    Status = "error",
                    Details = "Incorrect password."
                });
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(ClaimTypes.Name, user.Email)
            };

            var token = new JwtSecurityToken(
                issuer: configuration["Tokens:Issuer"],
                audience: configuration["Tokens:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
                );

            return Json(new ResponseWithToken
            {
                Status = "ok",
                Details = dbContext.Users.First(u => u.Email == user.Email).FirstName,
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Register([FromBody] User user)
        {
            if (!Regex.IsMatch(user.Email, @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$") ||
                string.IsNullOrEmpty(user.Password) || string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName))
            {
                return Json(new Response
                {
                    Status = "error",
                    Details = "Incorrect data."
                });
            }

            if (dbContext.Users.Any(u => u.Email == user.Email))
            {
                return Json(new Response
                {
                    Status = "error",
                    Details = "User already registed."
                });
            }

            user.Id = dbContext.Users.Count() == 0 ? 1 : (dbContext.Users.Last().Id + 1);
            user.Password = Utils.GetHash(user.Password);
            user.Role = "user";
            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(ClaimTypes.Name, user.Email)
            };

            var token = new JwtSecurityToken(
                issuer: configuration["Tokens:Issuer"],
                audience: configuration["Tokens:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
                );

            return Json(new ResponseWithToken
            {
                Status = "ok",
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }
    }
}