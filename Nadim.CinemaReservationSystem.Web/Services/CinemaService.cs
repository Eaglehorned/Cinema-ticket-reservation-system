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

        private Result ChangeCinemaName(int cinemaId, string newName)
        {
            Cinema changedCinema = dbContext.Cinemas.FirstOrDefault(c => c.CinemaId == cinemaId);

            if (changedCinema.Name == newName)
            {
                return new Result
                {
                    ResultOk = true,
                };
            }

            changedCinema.Name = newName;
            dbContext.Entry(changedCinema).Property("Name").IsModified = true;

            dbContext.SaveChanges();

            return new Result
            {
                ResultOk = true,
            };
        }

        private Result ChangeCinemaCity(int cinemaId, string city)
        {
            Cinema changedCinema = dbContext.Cinemas.FirstOrDefault(c => c.CinemaId == cinemaId);

            if (changedCinema.City == city)
            {
                return new Result
                {
                    ResultOk = true,
                };
            }

            changedCinema.City = city;
            dbContext.Entry(changedCinema).Property("City").IsModified = true;

            dbContext.SaveChanges();

            return new Result
            {
                ResultOk = true,
            };
        }

        private Result ChangeCinemaDefaultSeatPrice(int cinemaId, decimal price)
        {
            if (price < 0)
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Invalid data.",
                };
            }

            Cinema changedCinema = dbContext.Cinemas.FirstOrDefault(c => c.CinemaId == cinemaId);

            if (changedCinema.DefaultSeatPrice == price)
            {
                return new Result
                {
                    ResultOk = true,
                };
            }

            changedCinema.DefaultSeatPrice = price;
            dbContext.Entry(changedCinema).Property("DefaultSeatPrice").IsModified = true;

            dbContext.SaveChanges();

            return new Result
            {
                ResultOk = true,
            };
        }

        private Result ChangeCinemaVipSeatPrice(int cinemaId, decimal price)
        {
            if (price < 0)
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Invalid data.",
                };
            }

            Cinema changedCinema = dbContext.Cinemas.FirstOrDefault(c => c.CinemaId == cinemaId);

            if (changedCinema.DefaultSeatPrice == price)
            {
                return new Result
                {
                    ResultOk = true,
                };
            }

            changedCinema.VipSeatPrice = price;

            dbContext.SaveChanges();

            return new Result
            {
                ResultOk = true,
            };
        }

        private Result ChangeCinemaRooms(int cinemaId, List<CinemaRoomInfo> cinemaRooms)
        {
            Cinema changedCinema = dbContext.Cinemas.FirstOrDefault(c => c.CinemaId == cinemaId);

            var deleteCinemaRooms = dbContext.CinemaRooms.Include(room => room.Seats).Where(room => room.CinemaId == changedCinema.CinemaId);

            if (deleteCinemaRooms.Count() != 0)
            {
                foreach (var room in deleteCinemaRooms)
                {
                    dbContext.Remove(room);
                }
                dbContext.SaveChanges();
            }

            List<CinemaRoom> newCinemaRooms = new List<CinemaRoom>();

            foreach (CinemaRoomInfo room in cinemaRooms)
            {
                newCinemaRooms.Add(new CinemaRoom
                {
                    Name = room.Name,
                    Seats = new List<Seat>(),
                });

                foreach (SeatInfo seat in room.Seats)
                {
                    newCinemaRooms.Last().Seats.Add(new Seat
                    {
                        Row = seat.Row,
                        Column = seat.Column,
                        Type = seat.Type,
                    });
                }
            }

            changedCinema.CinemaRooms = newCinemaRooms;

            dbContext.SaveChanges();

            return new Result
            {
                ResultOk = true,
            };

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

            if (!String.IsNullOrEmpty(cinemaInfo.Name))
            {
                return ChangeCinemaName(cinemaId, cinemaInfo.Name);
            }

            if (!String.IsNullOrEmpty(cinemaInfo.City))
            {
                return ChangeCinemaCity(cinemaId, cinemaInfo.City);
            }

            if (cinemaInfo.DefaultSeatPrice != 0)
            {
                return ChangeCinemaDefaultSeatPrice(cinemaId, cinemaInfo.DefaultSeatPrice);
            }

            if (cinemaInfo.VipSeatPrice != 0)
            {
                return ChangeCinemaVipSeatPrice(cinemaId, cinemaInfo.VipSeatPrice);
            }

            return new Result
            {
                ResultOk = true,
            };
        }

        public Result CreateCinema(CinemaInfo cinemaInfo)
        {
            if (CinemaExists(cinemaInfo))
            {
                return new DataValidationResult
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

        public Result GetCinemaList()
        {
            return new GetCinemaListResult
            {
                ResultOk = true,
                CinemaList = dbContext.Cinemas.Select(c => new { c.Name, c.City, c.CinemaId })
            };
        }

        public Result GetCinema(int id)
        {
            var cinema = dbContext.Cinemas
                .Include(c => c.CinemaRooms)
                .FirstOrDefault(c => c.CinemaId == id);

            if (!CinemaExists(id))
            {
                return new Result
                {
                    ResultOk = false,
                };
            }

            return new GetCinemaResult
            {
                ResultOk = true,
                Cinema = (from c in dbContext.Cinemas
                          where c.CinemaId == id
                          select new
                          {
                              Info = new
                              {
                                  c.Name,
                                  c.City,
                                  c.DefaultSeatPrice,
                                  c.VipSeatPrice
                              },
                              CinemaRooms = (from r in c.CinemaRooms
                                             select new { r.CinemaRoomId, r.Name })
                          }).FirstOrDefault()
            };
        }

        public ResultCreated CreateCinemaRoom(int cinemaId, CinemaRoomInfo cinemaRoomInfo)
        {
            if (!CinemaExists(cinemaId))
            {
                return new ResultCreated
                {
                    ResultOk = false
                };
            }

            CinemaRoom cinemaRoom = new CinemaRoom
            {
                Name = cinemaRoomInfo.Name,
                Seats = new List<Seat>()
            };

            foreach (var s in cinemaRoomInfo.Seats)
            {
                cinemaRoom.Seats.Add(new Seat
                {
                    Type = s.Type,
                    Row = s.Row,
                    Column = s.Column
                });
            }

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

            List<Seat> seats = new List<Seat>();

            foreach (var s in cinemaRoomInfo.Seats) {
                seats.Add(new Seat
                {
                    Type = s.Type,
                    Row = s.Row,
                    Column = s.Column
                });
            }

            cinemaRoom.Seats = seats;

            dbContext.SaveChanges();

            return new ResultCreated
            {
                ResultOk = true
            };
        }

        public Result GetCinemaRoom(int cinemaId, int cinemaRoomId)
        {
            if (!CinemaExists(cinemaId))
            {
                return new Result
                {
                    ResultOk = false
                };
            }

            if (!CinemaRoomExists(cinemaRoomId))
            {
                return new Result
                {
                    ResultOk = false
                };
            }
            
            return new GetCinemaRoomResult
            {
                ResultOk = true,
                CinemaRoom = (from r in dbContext.CinemaRooms
                              where r.CinemaRoomId == cinemaRoomId
                              select new
                              {
                                  Info = new
                                  {
                                      r.Name
                                  },
                                  Seats = (from s in r.Seats
                                           select new { s.Type, s.Row, s.Column })
                              }).FirstOrDefault()
            };
        }
    }
}
