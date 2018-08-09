using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web.Contracts
{
    public interface IFilmService
    {
        ResultCreated CreateFilm(FilmInfo filmInfo);

        Result GetFilmList();

        Result GetFilm(int filmId);

        Result EditFilm(int filmId, FilmInfo filmInfo);
    }
}
