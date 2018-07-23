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
        private readonly IAuthenticationService authorizationService;

        public AuthenticationController(IAuthenticationService authorizationService)
        {
            this.authorizationService = authorizationService;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Login([FromBody] UserLoginInfo user)
        {
            Result result = authorizationService.Login(user);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Register([FromBody] UserRegistrationInfo user)
        {
            Result result = authorizationService.Register(user);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}