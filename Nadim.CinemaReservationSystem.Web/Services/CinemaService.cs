﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Contracts;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web.Services
{
    public class CinemaService : ICinemaService
    {
        private readonly CinemaReservationSystemContext dbContext;

        public CinemaService(CinemaReservationSystemContext dbContext)
        {
            this.dbContext = dbContext;
        }

        private bool CinemaExists(string name)
        {
            return dbContext.Cinemas.Any(c => c.Name == name);
        }

        private bool CinemaInputInfoValid(CinemaCreationInfo cinemaInfo)
        {
            foreach (CinemaRoomCreationInfo room in cinemaInfo.CinemaRooms)
            {
                {
                    if (!(room.Seats.Count > 0) ||
                        room.Seats.Exists(s => s.Row < 0) ||
                        room.Seats.Exists(s => s.Column < 0))
                        return false;
                }
            }
            return true;
        }

        private Cinema GenerateCinema(CinemaCreationInfo cinemaInfo)
        {
            var newCinema = new Cinema
            {
                City = cinemaInfo.City,
                Name = cinemaInfo.Name,
                DefaultSeatPrice = cinemaInfo.DefaultSeatPrice,
                VipSeatPrice = cinemaInfo.VipSeatPrice,
                CinemaRooms = new List<CinemaRoom>()
            };

            foreach (CinemaRoomCreationInfo room in cinemaInfo.CinemaRooms)
            {
                newCinema.CinemaRooms.Add(new CinemaRoom
                {
                    Name = room.Name,
                    Seats = new List<Seat>(),
                });
                foreach (SeatCreationInfo seat in room.Seats)
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

        private Result ChangeCinemaName(string name, string newName)
        {
            if (name == newName)
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Name is the same",
                };
            }

            Cinema changedCinema = dbContext.Cinemas.FirstOrDefault(c => c.Name == name);

            changedCinema.Name = newName;
            dbContext.Entry(changedCinema).Property("Name").IsModified = true;

            dbContext.SaveChanges();

            return new Result
            {
                ResultOk = true,
            };
        }

        private Result ChangeCinemaCity(string name, string city)
        {
            var changedCinema = dbContext.Cinemas.FirstOrDefault(c => c.Name == name);

            if (changedCinema.City == city) {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "City is the same",
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

        private Result ChangeCinemaDefaultSeatPrice(string name, decimal price)
        {
            var changedCinema = dbContext.Cinemas.FirstOrDefault(c => c.Name == name);

            if (changedCinema.DefaultSeatPrice == price && price < 0)
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Name is the same",
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

        private Result ChangeCinemaVipSeatPrice(string name, decimal price) {
            var changedCinema = dbContext.Cinemas.FirstOrDefault(c => c.Name == name);

            if (changedCinema.VipSeatPrice == price && price < 0)
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Name is the same",
                };
            }

            changedCinema.VipSeatPrice = price;
            dbContext.Entry(changedCinema).Property("VipSeatPrice").IsModified = true;

            dbContext.SaveChanges();

            return new Result
            {
                ResultOk = true,
            };
        }

        private Result ChangeCinemaRooms(string name, List<CinemaRoomCreationInfo> cinemaRooms)
        {
            //dont know how to make
            foreach (CinemaRoom room in dbContext.Cinemas.First(c => c.Name == name).CinemaRooms)
            {
                dbContext.CinemaRooms.Remove(room);
            }

            dbContext.SaveChanges();

            var changedCinema = dbContext.Cinemas.FirstOrDefault(c => c.Name == name);

            List<CinemaRoom> tempCinemaRooms = new List<CinemaRoom>();

            foreach (CinemaRoomCreationInfo room in cinemaRooms)
            {
                tempCinemaRooms.Add(new CinemaRoom
                {
                    Name = room.Name,
                    Seats = new List<Seat>(),
                });
                foreach (SeatCreationInfo seat in room.Seats)
                {
                    tempCinemaRooms.Last().Seats.Add(new Seat
                    {
                        Row = seat.Row,
                        Column = seat.Column,
                        Type = seat.Type,
                    });
                }
            }

            changedCinema.CinemaRooms = tempCinemaRooms;

            foreach (CinemaRoom room in changedCinema.CinemaRooms)
            {
                dbContext.CinemaRooms.Add(room);
            }

            dbContext.SaveChanges();

            return new Result
            {
                ResultOk = true,
            };

        }

        public Result EditCinema(CinemaEditingInfo cinemaInfo)
        {
            if (!String.IsNullOrEmpty(cinemaInfo.NewName))
            {
                return ChangeCinemaName(cinemaInfo.Name, cinemaInfo.NewName);
            }

            if (!String.IsNullOrEmpty(cinemaInfo.City))
            {
                return ChangeCinemaCity(cinemaInfo.Name, cinemaInfo.City);
            }

            if (cinemaInfo.DefaultSeatPrice != 0)
            {
                return ChangeCinemaDefaultSeatPrice(cinemaInfo.Name, cinemaInfo.DefaultSeatPrice);
            }

            if (cinemaInfo.VipSeatPrice != 0)
            {
                return ChangeCinemaVipSeatPrice(cinemaInfo.Name, cinemaInfo.VipSeatPrice);
            }

            if (cinemaInfo.CinemaRooms != null)
            {
                return ChangeCinemaRooms(cinemaInfo.Name, cinemaInfo.CinemaRooms);
            }

            return new DataValidationResult
            {
                ResultOk = false,
                Details = "Nothing changed",
            };
        }

        public Result CreateCinema(CinemaCreationInfo cinemaInfo)
        {
            if (!CinemaInputInfoValid(cinemaInfo))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Invalid data."
                };
            }

            if (CinemaExists(cinemaInfo.Name))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Such cinema already exists."
                };
            }

            dbContext.Cinemas.Add(GenerateCinema(cinemaInfo));
            dbContext.SaveChanges();

            return new Result
            {
                ResultOk = true
            };
        }

        public Result GetCinemaList()
        {

            var cinemaList = dbContext.Cinemas.Select(c => c.Name);

            if (cinemaList == null)
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Cinema list is empty",
                };
            }

            return new GetCinemaListResult
            {
                ResultOk = true,
                CinemaList = cinemaList.ToList(),
            };
        }
    }
}
