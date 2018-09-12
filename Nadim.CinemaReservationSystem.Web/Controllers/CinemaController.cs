using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nadim.CinemaReservationSystem.Web.Contracts;
using Nadim.CinemaReservationSystem.Web.Models;
using Microsoft.Extensions.Logging;

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
        public IActionResult CreateCinema([FromBody] CinemaInfo cinemaInfo)
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
        public IActionResult EditCinema([FromBody] CinemaInfo cinemaInfo, int cinemaId)
        {
            Result result = сinemaService.EditCinema(cinemaId, cinemaInfo);

            if (result.ResultOk)
            {
                return Ok();
            }
            return NotFound(result);
        }

        [HttpGet]
        public IActionResult GetCinemaList()
        {
            GetResult<IEnumerable<ResponseCinemaDisplayInfo>> result = сinemaService.GetCinemaList();

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpGet("{cinemaId}")]
        public IActionResult GetCinema(int cinemaId)
        {
            GetResult<ResponseCinemaFullInfo> result = сinemaService.GetCinema(cinemaId);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpGet("{cinemaId}/cinemaRooms/{cinemaRoomId}")]
        public IActionResult GetCinemaRoom(int cinemaId, int cinemaRoomId)
        {
            GetResult<ResponseCinemaRoomInfo> result = сinemaService.GetCinemaRoom(cinemaId, cinemaRoomId);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("{cinemaId}/cinemaRooms")]
        public IActionResult CreateCinemaRoom([FromBody] CinemaRoomInfo cinemaRoom, int cinemaId)
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
        public IActionResult EditCinemaRoom([FromBody] CinemaRoomInfo cinemaRoomInfo, int cinemaId, int cinemaRoomId)
        {
            Result result = сinemaService.EditCinemaRoom(cinemaId, cinemaRoomId, cinemaRoomInfo);

            if (result.ResultOk)
            {
                return Ok();
            }
            else
                return NotFound(result);
        }

        [Authorize]
        [HttpGet("{cinemaId}/cinemaRooms")]
        public IActionResult GetCinemaRoomList(int cinemaId)
        {
            GetResult<IEnumerable<ResponseCinemaRoomDisplayInfo>> result = сinemaService.GetCinemaRoomList(cinemaId);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpGet("{cinemaId}/cinemaRooms/{cinemaRoomId}/seatTypes")]
        public IActionResult GetCinemaRoomSeatTypes(int cinemaId, int cinemaRoomId)
        {
            GetResult<IEnumerable<ResponseSeatTypesInCinemaRoomInfo>> result = сinemaService.GetCinemaRoomSeatTypes(cinemaId, cinemaRoomId);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }
    }
}