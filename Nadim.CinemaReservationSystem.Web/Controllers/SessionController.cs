using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public ActionResult<ResultCreated> CreateSession([FromBody] SessionInfo sessionInfo)
        {
            ResultCreated result = sessionService.CreateSession(sessionInfo);

            if (result.ResultOk)
            {
                return Created($"api/sessions/{result.Id}", typeof(Session));
            }
            return BadRequest(result);
        }

        [HttpGet]
        public ActionResult<GetResult<List<ResponseSessionDisplayInfo>>> GetSessionList([FromQuery] SessionFilter filter)
        {
            GetResult<List<ResponseSessionDisplayInfo>> result = sessionService.GetSessionList(filter);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpGet("{sessionId}")]
        public ActionResult<GetResult<ResponseSessionFullInfo>> GetSession(int sessionId)
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
        public ActionResult<Result> EditSession(int sessionId, [FromBody] SessionInfo sessionInfo)
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
        public ActionResult<Result> EditSessionSeat(int sessionId, int sessionSeatId, [FromBody]SessionSeatInfo sessionSeatInfo)
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
        public ActionResult<GetResult<List<SeatReservationInfo>>> GetSessionSeats(int sessionId, [FromHeader(Name = "If-Modified-Since")]string lastTimeUpdated)
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