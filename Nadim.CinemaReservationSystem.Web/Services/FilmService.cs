﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;
using Nadim.CinemaReservationSystem.Web.Contracts;
using Microsoft.EntityFrameworkCore;

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

        private bool FilmInfoValid(FilmInfo filmInfo)
        {
            return !String.IsNullOrEmpty(filmInfo.Name)
                && !String.IsNullOrEmpty(filmInfo.Description)
                && filmInfo.StartDate < filmInfo.EndDate
                && filmInfo.Duration != 0;
        }

        private IQueryable<Session> CreateFilteredFilmSessionsQuery(int filmId, FilmFilter filter)
        {
            IQueryable<Session> query = dbContext.Sessions
                .Where(s => s.Film.FilmId == filmId)
                .Include(s => s.Film)
                .Include(s => s.CinemaRoom)
                .Include(s => s.CinemaRoom.Cinema)
                .AsNoTracking();

            if (filter.StartDate != null)
            {
                query = query.Where(s => filter.StartDate < s.BeginTime);
            }
            if (filter.EndDate != null)
            {
                query = query.Where(s => s.BeginTime < filter.EndDate);
            }

            return query;
        }

        public GetResult<IEnumerable<ResponseFilmDisplayInfo>> GetFilmList()
        {
            return new GetResult<IEnumerable<ResponseFilmDisplayInfo>>
            {
                ResultOk = true,
                RequestedData = dbContext.Films
                    .Select(f => new ResponseFilmDisplayInfo
                    {
                        Name = f.Name,
                        FilmId = f.FilmId
                    })
            };
        }

        public ResultCreated CreateFilm(FilmInfo filmInfo)
        {
            if (FilmExists(filmInfo.Name))
            {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "Such film already exists."
                };
            }

            if (!FilmInfoValid(filmInfo))
            {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "Invalid film data."
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

        public GetResult<FilmInfo> GetFilm(int filmId)
        {
            if (!FilmExists(filmId))
            {
                return new GetResult<FilmInfo>
                {
                    ResultOk = false,
                    Details = "Such film does not exist."
                };
            }

            return new GetResult<FilmInfo>
            {
                ResultOk = true,
                RequestedData = dbContext.Films
                    .Where(f => f.FilmId == filmId)
                    .Select(f => new FilmInfo
                    {
                        FilmId = f.FilmId,
                        Name = f.Name,
                        StartDate = f.StartDate,
                        EndDate = f.EndDate,
                        Duration = f.Duration,
                        Description = f.Description
                    }).FirstOrDefault()
            };
        }

        public GetResult<IEnumerable<ResponseSessionDisplayInfo>> GetFilmSessions(int filmId, FilmFilter filters)
        {
            if (!FilmExists(filmId))
            {
                return new GetResult<IEnumerable<ResponseSessionDisplayInfo>>
                {
                    ResultOk = false,
                    Details = "Such film does not exist."
                };
            }

            return new GetResult<IEnumerable<ResponseSessionDisplayInfo>>
            {
                ResultOk = true,
                RequestedData = CreateFilteredFilmSessionsQuery(filmId, filters)
                .Select(s => new ResponseSessionDisplayInfo
                {
                    SessionId = s.SessionId,
                    Film = new ResponseFilmDisplayInfo
                    {
                        FilmId = s.FilmId,
                        Name = s.Film.Name
                    },
                    Cinema = new ResponseCinemaDisplayInfo
                    {
                        Name = s.CinemaRoom.Cinema.Name,
                        City = s.CinemaRoom.Cinema.City,
                        CinemaId = s.CinemaRoom.Cinema.CinemaId
                    },
                    CinemaRoom = new ResponseCinemaRoomDisplayInfo
                    {
                        Name = s.CinemaRoom.Name,
                        CinemaRoomId = s.CinemaRoomId
                    },
                    BeginTime = s.BeginTime
                })
            };
        }

        public Result EditFilm(int filmId, FilmInfo filmInfo)
        {
            if (!FilmExists(filmId))
            {
                return new Result
                {
                    ResultOk = false,
                    Details = "Such film does not exist."
                };
            }

            if (!FilmInfoValid(filmInfo))
            {
                return new Result
                {
                    ResultOk = false,
                    Details = "Invalid film data."
                };
            }

            Film film = dbContext.Films.FirstOrDefault(f => f.FilmId == filmId);

            film.Name = filmInfo.Name;
            film.StartDate = filmInfo.StartDate;
            film.EndDate = filmInfo.EndDate;
            film.Duration = filmInfo.Duration;
            film.Description = filmInfo.Description;

            dbContext.SaveChanges();

            return new Result
            {
                ResultOk = true
            };
        }
    }
}
