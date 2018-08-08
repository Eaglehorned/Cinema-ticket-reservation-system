using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;
using Nadim.CinemaReservationSystem.Web.Contracts;

namespace Nadim.CinemaReservationSystem.Web.Services
{
    public class FilmService : IFilmService
    {
        private readonly CinemaReservationSystemContext dbContext;

        public FilmService(CinemaReservationSystemContext dbContext)
        {
            this.dbContext = dbContext;
        }

        private bool FilmExists(string Name)
        {
            return dbContext.Films.Any(f => f.Name == Name);
        }

        private bool FilmExists(int filmId)
        {
            return dbContext.Films.Any(f => f.FilmId == filmId);
        }

        public Result GetFilmList() {
            return new GetFilmListResult
            {
                ResultOk = true,
                FilmList = dbContext.Films
                    .Select(f => new ResponseFilmDisplayInfo
                    {
                        Name = f.Name,
                        FilmId = f.FilmId
                    }).ToList()
            };
        }

        public ResultCreated CreateFilm(FilmInfo filmInfo)
        {
            if (FilmExists(filmInfo.Name)) {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "Such film already exists."
                };
            }

            dbContext.Films.Add(new Film
            {
                Name = filmInfo.Name,
                StartDate = filmInfo.StartDate,
                EndDate = filmInfo.EndDate,
                Duration = filmInfo.Duration,
                Description = filmInfo.Description
            });

            dbContext.SaveChanges();

            return new ResultCreated
            {
                ResultOk = true,
                Id = dbContext.Films.Last().FilmId
            };
        }

        public Result GetFilm(int filmId)
        {
            if (!FilmExists(filmId))
            {
                return new Result
                {
                    ResultOk = false
                };
            }

            return new GetFilmResult
            {
                ResultOk = true,
                FilmInfo = dbContext.Films
                    .Where(f => f.FilmId == filmId)
                    .Select(f => new FilmInfo
                    {
                        Name = f.Name,
                        StartDate = f.StartDate,
                        EndDate = f.EndDate,
                        Duration = f.Duration,
                        Description = f.Description
                    }).FirstOrDefault()
            };
        }
    }
}
