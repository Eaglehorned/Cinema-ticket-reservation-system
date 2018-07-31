using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nadim.CinemaReservationSystem.Web.Contracts;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web.Controllers
{
    [Route("api/cinemas")]
    public class CinemaController : Controller
    {
        private readonly ICinemaService сinemaService;

        public CinemaController(ICinemaService сinemaService)
        {
            this.сinemaService = сinemaService;
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public ActionResult<Result> AddCinema([FromBody] CinemaCreationInfo cinemaInfo)
        {
            Result result = сinemaService.CreateCinema(cinemaInfo);

            if (result.ResultOk)
            {
                return result;
            }
            return BadRequest(result);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("{name}")]
        public IActionResult EditCinema([FromBody] CinemaCreationInfo cinemaInfo, string name)
        {
            Result result = сinemaService.EditCinema(cinemaInfo, name);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet]
        public ActionResult<Result> GetCinemaList()
        {
            Result result = сinemaService.GetCinemaList();

            if (result.ResultOk)
            {
                return result;
                
            }
            return BadRequest(result);
        }
    }
}