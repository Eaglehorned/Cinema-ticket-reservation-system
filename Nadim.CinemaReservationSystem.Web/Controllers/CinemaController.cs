using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Nadim.CinemaReservationSystem.Web.Models;
using Nadim.CinemaReservationSystem.Web.Contracts;
using Microsoft.AspNetCore.Authorization;

namespace Nadim.CinemaReservationSystem.Web.Controllers
{
    [Route("api/[controller]")]
    public class CinemaController : Controller
    {
        private readonly ICreateCinemaService CreateCinemaService;

        public CinemaController(ICreateCinemaService createCinemaService)
        {
            this.CreateCinemaService = createCinemaService;
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult AddCinema([FromBody] CinemaCreationInfo cinemaInfo)
        {
            Result result = CreateCinemaService.CreateCinema(cinemaInfo);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}