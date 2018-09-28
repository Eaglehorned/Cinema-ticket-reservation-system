using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nadim.CinemaReservationSystem.Web.Contracts;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web.Controllers
{
    [Route("api/films")]
    public class FilmController : Controller
    {
        private readonly IFilmService filmService;

        public FilmController(IFilmService filmService)
        {
            this.filmService = filmService;
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public IActionResult CreateFilm([FromBody] FilmInfo filmInfo)
        {
            ResultCreated result = filmService.CreateFilm(filmInfo);

            if (result.ResultOk)
            {
                return Created($"api/films/{result.Id}", typeof(Film));
            }
            return BadRequest(result);
        }

        [HttpGet]
        public IActionResult GetFilmList()
        {
            GetResult<IEnumerable<ResponseFilmDisplayInfo>> result = filmService.GetFilmList();

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [Authorize]
        [HttpGet("{filmId}")]
        public IActionResult GetFilm(int filmId)
        {
            GetResult<FilmInfo> result = filmService.GetFilm(filmId);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            return NotFound(result);
        }

        [HttpGet("{filmId}")]
        public IActionResult GetFilmSessions(int filmId)
        {
            GetResult<IEnumerable<ResponseSessionDisplayInfo>> result = filmService.GetFilmSessions(filmId);

            if (result.ResultOk)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }


        [Authorize(Roles = "admin")]
        [HttpPut("{filmId}")]
        public IActionResult EditFilm([FromBody] FilmInfo filmInfo, int filmId)
        {
            Result result = filmService.EditFilm(filmId, filmInfo);

            if (result.ResultOk)
            {
                return Ok();
            }
            return NotFound(result);
        }
    }
}