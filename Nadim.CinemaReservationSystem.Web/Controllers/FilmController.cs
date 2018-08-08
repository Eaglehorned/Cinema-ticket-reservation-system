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

        public FilmController(IFilmService filmService) {
            this.filmService = filmService;
        }

        [HttpGet]
        public ActionResult<Result> GetFilmList()
        {
            Result result = filmService.GetFilmList();

            if (result.ResultOk)
            {
                return result;
            }
            return NotFound();
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public ActionResult<ResultCreated> CreateFilm([FromBody] FilmInfo filmInfo)
        {
            ResultCreated result = filmService.CreateFilm(filmInfo);

            if (result.ResultOk) {
                return Created($"api/films/{result.Id}", typeof(Film));
            }
            return BadRequest(result);
        }
    }
}