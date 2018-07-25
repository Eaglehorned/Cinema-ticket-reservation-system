using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Contracts;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web.Services
{
    public class AddCinemaService : IAddCinemaService
    {
        private readonly CinemaReservationSystemContext dbContext;

        public AddCinemaService(CinemaReservationSystemContext dbContext)
        {
            this.dbContext = dbContext;
        }

        private bool DoesUserHavePermission(string userName)
        {
            return String.IsNullOrEmpty(userName) && 
                dbContext.Users.Any(u => u.UserName == userName) &&
                dbContext.Users.First(u => u.UserName == userName).Role == "admin";
        }

        private bool CinemaExists(string name) {
            return dbContext.Cinemas.Any(c => c.Name == name);
        }

        public Result AddCinema(CinemaAdditionInfo cinemaInfo)
        {
            /*
            if (!DoesUserHavePermission(cinemaInfo.CurrentUsername))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "User dont have permisson to do this."
                };
            }
            */
            if (CinemaExists(cinemaInfo.Name))
            {
                return new DataValidationResult
                {
                    ResultOk = false,
                    Details = "Such cinema already exists."
                };
            }

            var newCinema = new Cinema
            {
                City = cinemaInfo.City,
                Name = cinemaInfo.Name,
                CinemaRooms = new List<CinemaRoom>()
            };

            for (int i = 0; i < cinemaInfo.CinemaRoomsCount; i++) {
                newCinema.CinemaRooms.Add(new CinemaRoom
                {
                    Number = i,
                    Seats = new List<Seat>()
                });
                foreach (SeatAdditionInfo seat in cinemaInfo.Seats) {
                    newCinema.CinemaRooms.Last().Seats.Add(new Seat
                    {
                        Row = seat.Row,
                        Column = seat.Column,
                        Type = seat.Type,
                        Price = seat.Type == "default" ? cinemaInfo.DefaultSeatPrice : cinemaInfo.VipSeatPrice,
                        Booked = false,
                    });
                }
            }

            dbContext.Cinemas.Add(newCinema);
            dbContext.SaveChanges();

            return new Result { };
        }
    }
}
