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

        GetResult<IEnumerable<ResponseFilmDisplayInfo>> GetFilmList();

        GetResult<FilmInfo> GetFilm(int filmId);

        GetResult<IEnumerable<ResponseSessionDisplayInfo>> GetFilmSessions(int filmId, FilmFilter filter);

        Result EditFilm(int filmId, FilmInfo filmInfo);

    }
}
