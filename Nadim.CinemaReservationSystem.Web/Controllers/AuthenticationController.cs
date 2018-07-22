using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nadim.CinemaReservationSystem.Web.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Nadim.CinemaReservationSystem.Web.Services;

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
        public IActionResult Login([FromBody] UserLoginInfo user)
        {
            if (!AuthenticationService.IsUserLoginDataValid(user))
            {
                return BadRequest(new Response
                {
                    Status = "error",
                    Details = "Incorrect data."
                });
            }

            if (!AuthenticationService.UserExists(dbContext, user.Email))
            {
                return BadRequest(new Response
                {
                    Status = "error",
                    Details = "User doesnt exist."
                });
            }

            if (!AuthenticationService.IsUserDataCorrect(dbContext, user))
            {
                return BadRequest(new Response
                {
                    Status = "error",
                    Details = "Incorrect password."
                });
            }

            return Ok(new ResponseWithToken
            {
                Status = "ok",
                Details = dbContext.Users.First(u => u.Email == user.Email).FirstName + 
                    " " + dbContext.Users.First(u => u.Email == user.Email).LastName,
                Token = AuthenticationService.GenerateToken(configuration, user.Email)
            });
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Register([FromBody] UserRegistrationInfo user)
        {
            if (!AuthenticationService.IsUserRegistrationDataValid(user))
            {
                return BadRequest(new Response
                {
                    Status = "error",
                    Details = "Incorrect data."
                });
            }

            if (AuthenticationService.UserExists(dbContext, user.Email))
            {
                return BadRequest(new Response
                {
                    Status = "error",
                    Details = "User already registed."
                });
            }

            dbContext.Users.Add(new User {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = Utils.GetHash(user.Password),
                Email = user.Email,
                Role = "user"
            });

            dbContext.SaveChanges();

            return Ok(new ResponseWithToken
            {
                Status = "ok",
                Token = AuthenticationService.GenerateToken(configuration, user.Email)
            });
        }
    }
}