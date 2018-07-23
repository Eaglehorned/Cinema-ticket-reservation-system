using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nadim.CinemaReservationSystem.Web.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Nadim.CinemaReservationSystem.Web.Contracts;
using Nadim.CinemaReservationSystem.Web.Services;

namespace Nadim.CinemaReservationSystem.Web.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly CinemaReservationSystemContext dbContext;
        public readonly IConfiguration configuration;
        public IAuthenticationService authorizationService;

        public AuthenticationController(CinemaReservationSystemContext dbContext, IConfiguration configuration, IAuthenticationService authorizationService)
        {
            this.dbContext = dbContext;
            this.configuration = configuration;
            this.authorizationService = authorizationService;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Login([FromBody] UserLoginInfo user)
        {
            Result result = authorizationService.ValidateLoginData(dbContext, configuration, user);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Register([FromBody] UserRegistrationInfo user)
        {
            Result result = authorizationService.ValidateRegisterData(dbContext, configuration, user);

            if (result.ResultOk)
            {
                dbContext.Users.Add(new User
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Password = Utils.GetHash(user.Password),
                    Email = user.Email,
                    Role = "user"
                });

                dbContext.SaveChanges();

                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }
    }
}