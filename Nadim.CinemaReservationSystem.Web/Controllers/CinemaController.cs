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
        public ActionResult<Result> AddCinema([FromBody] CinemaInfo cinemaInfo)
        {
            Result result = сinemaService.CreateCinema(cinemaInfo);

            if (result.ResultOk)
            {
                return Created("api/cinemas/" + ((ResultCreated)result).Id, typeof(Cinema));
            }
            return BadRequest(result);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("{cinemaId}")]
        public ActionResult<Result> EditCinema([FromBody] CinemaInfo cinemaInfo, int cinemaId)
        {
            Result result = сinemaService.EditCinema(cinemaId, cinemaInfo);

            if (result.ResultOk)
            {
                return Created("api/cinemas/" + cinemaId.ToString(), typeof(Cinema));
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

        [Authorize(Roles = "admin")]
        [HttpGet("{cinemaId}")]
        public ActionResult<Result> GetCinema(int cinemaId)
        {
            Result result = сinemaService.GetCinema(cinemaId);

            return result;
        }
    }
}