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
        private readonly ICinemaService CinemaService;

        public CinemaController(ICinemaService createCinemaService)
        {
            this.CinemaService = createCinemaService;
        }

        [Authorize(Roles = "admin")]
        [HttpPost("[action]")]
        public IActionResult AddCinema([FromBody] CinemaCreationInfo cinemaInfo)
        {
            Result result = CinemaService.CreateCinema(cinemaInfo);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("[action]")]
        public IActionResult EditCinema([FromBody] CinemaEditingInfo cinemaInfo)
        {
            Result result = CinemaService.EditCinema(cinemaInfo);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("[action]")]
        public IActionResult GetCinemaList()
        {
            Result result = CinemaService.GetCinemaList();

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}