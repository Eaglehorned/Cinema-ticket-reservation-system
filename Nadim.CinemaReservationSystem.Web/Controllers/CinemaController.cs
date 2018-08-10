using System.Collections.Generic;
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
        public ActionResult<ResultCreated> CreateCinema([FromBody] CinemaInfo cinemaInfo)
        {
            ResultCreated result = сinemaService.CreateCinema(cinemaInfo);

            if (result.ResultOk)
            {
                return Created($"api/cinemas/{result.Id}", typeof(Cinema));
            }
            return BadRequest(result);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("{cinemaId}/info")]
        public ActionResult<Result> EditCinema([FromBody] CinemaInfo cinemaInfo, int cinemaId)
        {
            Result result = сinemaService.EditCinema(cinemaId, cinemaInfo);

            if (result.ResultOk)
            {
                return Ok();
            }
            return NotFound();
        }

        [HttpGet]
        public ActionResult<GetResult<List<ResponseCinemaDisplayInfo>>> GetCinemaList()
        {
            GetResult<List<ResponseCinemaDisplayInfo>> result = сinemaService.GetCinemaList();

            if (result.ResultOk)
            {
                return result;
            }
            return NotFound();
        }

        [Authorize]
        [HttpGet("{cinemaId}")]
        public ActionResult<GetResult<ResponseCinemaFullInfo>> GetCinema(int cinemaId)
        {
            GetResult<ResponseCinemaFullInfo> result = сinemaService.GetCinema(cinemaId);

            if (result.ResultOk)
            {
                return result;
            }
            return NotFound();
        }

        [Authorize]
        [HttpGet("{cinemaId}/cinemaRooms/{cinemaRoomId}")]
        public ActionResult<GetResult<ResponseCinemaRoomFullInfo>> GetCinemaRoom(int cinemaId, int cinemaRoomId)
        {
            GetResult<ResponseCinemaRoomFullInfo> result = сinemaService.GetCinemaRoom(cinemaId, cinemaRoomId);

            if (result.ResultOk) {
                return Ok(result);
            }
            return NotFound();
        }

        [Authorize(Roles = "admin")]
        [HttpPost("{cinemaId}/cinemaRooms")]
        public ActionResult<ResultCreated> CreateCinemaRoom([FromBody] CinemaRoomInfo cinemaRoom, int cinemaId)
        {
            ResultCreated result = сinemaService.CreateCinemaRoom(cinemaId, cinemaRoom);

            if (result.ResultOk)
            {
                return Created($"api/cinemas/{cinemaId}/cinemaRooms/{result.Id}", typeof(CinemaRoom));
            }
            return BadRequest(result);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("{cinemaId}/cinemaRooms/{cinemaRoomId}")]
        public ActionResult<Result> EditCinemaRoom([FromBody] CinemaRoomInfo cinemaRoomInfo, int cinemaId, int cinemaRoomId)
        {
            Result result = сinemaService.EditCinemaRoom(cinemaId, cinemaRoomId, cinemaRoomInfo);

            if (result.ResultOk)
            {
                return Ok();
            }
            else
                return NotFound();
        }
    }
}