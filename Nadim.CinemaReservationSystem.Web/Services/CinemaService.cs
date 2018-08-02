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
            return dbContext.CinemaRooms.Any(c => c.CinemaId == cinemaId);
        }

        private bool CinemaInputInfoValid(CinemaInfo cinemaInfo)
        {
            foreach (CinemaRoomInfo room in cinemaInfo.CinemaRooms)
            {
                if (!(room.Seats.Count > 0) ||
                    room.Seats.Exists(s => s.Row < 0) ||
                    room.Seats.Exists(s => s.Column < 0))
                    return false;
            }
            return true;
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

            foreach (CinemaRoomInfo room in cinemaInfo.CinemaRooms)
            {
                newCinema.CinemaRooms.Add(new CinemaRoom
                {
                    Name = room.Name,
                    Seats = new List<Seat>(),
                });
                foreach (SeatInfo seat in room.Seats)
                {
                    newCinema.CinemaRooms.Last().Seats.Add(new Seat
                    {
                        Row = seat.Row,
                        Column = seat.Column,
                        Type = seat.Type,
                    });
                }
            }

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
            //dbContext.Entry(changedCinema).Property("VipSeatPrice").IsModified = true;

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

            if (cinemaInfo.CinemaRooms != null)
            {
                return ChangeCinemaRooms(cinemaId, cinemaInfo.CinemaRooms);
            }

            return new Result
            {
                ResultOk = true,
            };
        }

        public Result CreateCinema(CinemaInfo cinemaInfo)
        {
            if (!CinemaInputInfoValid(cinemaInfo))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Invalid data."
                };
            }

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
                Id = generatedCinema.CinemaId.ToString(),
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
            Cinema cinema = dbContext.Cinemas
                .Include(c => c.CinemaRooms)
                    .ThenInclude(r => r.Seats)
                .FirstOrDefault(c => c.CinemaId == id);

            return new Result
            {
                ResultOk = true,
            };
        }
    }
}
