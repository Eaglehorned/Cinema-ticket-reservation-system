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

        [Authorize]
        [HttpGet]
        public ActionResult<GetResult<List<ResponseSessionDisplayInfo>>> GetSessionList()
        {
            GetResult<List<ResponseSessionDisplayInfo>> result = sessionService.GetSessionList();

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpGet("{sessionId}")]
        public ActionResult<GetResult<ResponseSessionFullInfo>> GetSession()
        {
            GetResult<ResponseSessionFullInfo> result = sessionService.GetSession();

            if (result.ResultOk)
            {
                return Ok(result);
            }
            NotFound(result);
        }
    }
}