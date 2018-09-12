using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Nadim.CinemaReservationSystem.Web.Contracts;
using Nadim.CinemaReservationSystem.Web.Models;
using Microsoft.AspNetCore.Authorization;

namespace Nadim.CinemaReservationSystem.Web.Controllers
{
    [Route("api/sessions")]
    public class SessionController : Controller
    {
        private readonly ISessionService sessionService;

        public SessionController(ISessionService sessionService)
        {
            this.sessionService = sessionService;
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public IActionResult CreateSession([FromBody] SessionInfo sessionInfo)
        {
            ResultCreated result = sessionService.CreateSession(sessionInfo);

            if (result.ResultOk)
            {
                return Created($"api/sessions/{result.Id}", typeof(Session));
            }
            return BadRequest(result);
        }

        [HttpGet]
        public IActionResult GetSessionList([FromQuery] SessionFilter filter)
        {
            GetResult<IEnumerable<ResponseSessionDisplayInfo>> result = sessionService.GetSessionList(filter);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpGet("{sessionId}")]
        public IActionResult GetSession(int sessionId)
        {
            GetResult<ResponseSessionFullInfo> result = sessionService.GetSession(sessionId);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("{sessionId}")]
        public IActionResult EditSession(int sessionId, [FromBody] SessionInfo sessionInfo)
        {
            Result result = sessionService.EditSession(sessionId, sessionInfo);

            if (result.ResultOk)
            {
                return Ok();
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpPut("{sessionId}/seats/{sessionSeatId}")]
        public IActionResult EditSessionSeat(int sessionId, int sessionSeatId, [FromBody]SessionSeatInfo sessionSeatInfo)
        {
            Result result = sessionService.EditSessionSeat(sessionId, sessionSeatId, sessionSeatInfo);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpGet("{sessionId}/seats")]
        public IActionResult GetSessionSeats(int sessionId, DateTime? lastTimeUpdated)
        {
            GetResult<List<SeatReservationInfo>> result = sessionService.GetSessionSeats(sessionId, lastTimeUpdated);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }
    }
}