using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Contracts;
using Nadim.CinemaReservationSystem.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace Nadim.CinemaReservationSystem.Web.Services
{
    public class CinemaService : ICinemaService
    {
        private readonly CinemaReservationSystemContext dbContext;

        public CinemaService(CinemaReservationSystemContext dbContext)
        {
            this.dbContext = dbContext;
        }

        private bool CinemaExists(CinemaInfo cinema)
        {
            return dbContext.Cinemas.Any(c => c.Name == cinema.Name && c.City == cinema.City);
        }

        private bool CinemaExists(int cinemaId)
        {
            return dbContext.Cinemas.Any(c => c.CinemaId == cinemaId);
        }

        private Cinema GenerateCinema(CinemaInfo cinemaInfo)
        {
            var newCinema = new Cinema
            {
                City = cinemaInfo.City,
                Name = cinemaInfo.Name,
                DefaultSeatPrice = cinemaInfo.DefaultSeatPrice,
                VipSeatPrice = cinemaInfo.VipSeatPrice,
                CinemaRooms = new List<CinemaRoom>()
            };

            return newCinema;
        }

        private bool CinemaRoomExists(int cinemaRoomId)
        {
            return dbContext.CinemaRooms.Any(c => c.CinemaRoomId == cinemaRoomId);
        }

        public Result EditCinema(int cinemaId, CinemaInfo cinemaInfo)
        {
            if (!CinemaExists(cinemaId))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Edited cinema does not exist.",
                };
            }

            var cinema = dbContext.Cinemas.FirstOrDefault(c => c.CinemaId == cinemaId);

            cinema.Name = cinemaInfo.Name;
            cinema.City = cinemaInfo.City;
            cinema.DefaultSeatPrice = cinemaInfo.DefaultSeatPrice;
            cinema.VipSeatPrice = cinemaInfo.VipSeatPrice;

            dbContext.SaveChanges();

            return new Result
            {
                ResultOk = true,
            };
        }

        public ResultCreated CreateCinema(CinemaInfo cinemaInfo)
        {
            if (CinemaExists(cinemaInfo))
            {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "Such cinema already exists."
                };
            }

            var generatedCinema = GenerateCinema(cinemaInfo);

            dbContext.Cinemas.Add(generatedCinema);
            dbContext.SaveChanges();

            return new ResultCreated
            {
                ResultOk = true,
                Id = generatedCinema.CinemaId,
            };
        }

        public GetResult<List<ResponseCinemaDisplayInfo>> GetCinemaList()
        {
            return new GetResult<List<ResponseCinemaDisplayInfo>>
            {
                ResultOk = true,
                RequestedData = dbContext.Cinemas
                    .Select( c => new ResponseCinemaDisplayInfo
                    {
                        Name = c.Name,
                        City = c.City,
                        CinemaId = c.CinemaId
                    }).ToList()
            };
        }

        public GetResult<ResponseCinemaFullInfo> GetCinema(int id)
        {
            if (!CinemaExists(id))
            {
                return new GetResult<ResponseCinemaFullInfo>
                {
                    ResultOk = false,
                };
            }

            return new GetResult<ResponseCinemaFullInfo>
            {
                ResultOk = true,
                RequestedData = dbContext.Cinemas
                    .Where(c => c.CinemaId == id)
                    .Select( c => new ResponseCinemaFullInfo
                    {
                        Info = new CinemaInfo
                        {
                            Name = c.Name,
                            City = c.City,
                            DefaultSeatPrice = c.DefaultSeatPrice,
                            VipSeatPrice = c.VipSeatPrice
                        },
                        CinemaRooms = c.CinemaRooms
                            .Select(r => new ResponseCinemaRoomDisplayInfo
                            {
                                CinemaRoomId = r.CinemaRoomId,
                                Name = r.Name
                            }).ToList()
                    }).FirstOrDefault()
            };
        }

        public ResultCreated CreateCinemaRoom(int cinemaId, CinemaRoomInfo cinemaRoomInfo)
        {
            if (!CinemaExists(cinemaId))
            {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "Cinema does not exist."
                };
            }

            CinemaRoom cinemaRoom = new CinemaRoom
            {
                Name = cinemaRoomInfo.Name,
                Seats = cinemaRoomInfo.Seats.Select( s=> new Seat
                {
                    Type = s.Type,
                    Row = s.Row,
                    Column = s.Column
                }).ToList()
            };

            Cinema cinema = dbContext.Cinemas
                .Include(c => c.CinemaRooms)
                .FirstOrDefault(c => c.CinemaId == cinemaId);

            cinema.CinemaRooms.Add(cinemaRoom);

            dbContext.SaveChanges();

            return new ResultCreated
            {
                ResultOk = true,
                Id = cinemaRoom.CinemaRoomId
            };
        }

        public ResultCreated EditCinemaRoom(int cinemaId, int cinemaRoomId, CinemaRoomInfo cinemaRoomInfo)
        {
            if (!CinemaExists(cinemaId))
            {
                return new ResultCreated
                {
                    ResultOk = false
                };
            }

            if (!CinemaRoomExists(cinemaRoomId))
            {
                return new ResultCreated
                {
                    ResultOk = false
                };
            }

            CinemaRoom cinemaRoom = dbContext.CinemaRooms
                .Include(r => r.Seats)
                .FirstOrDefault(r => r.CinemaRoomId == cinemaRoomId);

            cinemaRoom.Name = cinemaRoomInfo.Name;

            cinemaRoom.Seats = cinemaRoomInfo.Seats
                .Select(s => new Seat
                {
                    Type = s.Type,
                    Row = s.Row,
                    Column = s.Column
                }).ToList();


            dbContext.SaveChanges();

            return new ResultCreated
            {
                ResultOk = true
            };
        }

        public GetResult<ResponseCinemaRoomFullInfo> GetCinemaRoom(int cinemaId, int cinemaRoomId)
        {
            if (!CinemaExists(cinemaId))
            {
                return new GetResult<ResponseCinemaRoomFullInfo>
                {
                    ResultOk = false
                };
            }

            if (!CinemaRoomExists(cinemaRoomId))
            {
                return new GetResult<ResponseCinemaRoomFullInfo>
                {
                    ResultOk = false
                };
            }

            return new GetResult<ResponseCinemaRoomFullInfo>
            {
                ResultOk = true,
                RequestedData = dbContext.CinemaRooms
                    .Where(r => r.CinemaRoomId == cinemaRoomId)
                    .Select( r => new ResponseCinemaRoomFullInfo
                        {
                            Name = r.Name,
                            Seats = r.Seats
                                .Select( s => new SeatInfo {
                                    Type = s.Type,
                                    Row = s.Row,
                                    Column = s.Column
                                }).ToList()
                        })
                    .FirstOrDefault()
            };
        }
    }
}
