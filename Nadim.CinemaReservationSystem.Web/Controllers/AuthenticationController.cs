using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly CinemaReservationSystemContext dbContext;
        public AuthenticationController(CinemaReservationSystemContext context)
        {
            dbContext = context;
        }

        [HttpPost("[action]")]
        public IActionResult Authenticate([FromBody] User user)
        {
            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            //need to change return
            return View();
        }
    }
}