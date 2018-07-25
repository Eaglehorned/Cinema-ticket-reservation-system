using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Nadim.CinemaReservationSystem.Web.Models;
using Nadim.CinemaReservationSystem.Web.Contracts;

namespace Nadim.CinemaReservationSystem.Web.Controllers
{
    [Route("api/[controller]")]
    public class CinemaController : Controller
    {
        private readonly IAddCinemaService addCinemaService;

        public CinemaController(IAddCinemaService addCinemaService) {
            this.addCinemaService = addCinemaService;
        }

        [HttpPost("[action]")]
        public IActionResult AddCinema([FromBody] CinemaAdditionInfo cinemaInfo)
        {
            addCinemaService.AddCinema(cinemaInfo);
            return Ok();
        }
    }
}