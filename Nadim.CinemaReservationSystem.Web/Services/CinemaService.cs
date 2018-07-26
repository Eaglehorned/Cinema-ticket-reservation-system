using System;
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
            return cinemaInfo.CinemaRoomsCount > 0 &&
                !cinemaInfo.Seats.Exists(s => s.Row < 0) &&
                !cinemaInfo.Seats.Exists(s => s.Column < 0);
        }

        private Cinema GenerateCinema(CinemaCreationInfo cinemaInfo)
        {
            var newCinema = new Cinema
            {
                City = cinemaInfo.City,
                Name = cinemaInfo.Name,
                CinemaRooms = new List<CinemaRoom>()
            };

            for (int i = 0; i < cinemaInfo.CinemaRoomsCount; i++)
            {
                newCinema.CinemaRooms.Add(new CinemaRoom
                {
                    Number = i,
                    Seats = new List<Seat>()
                });
                foreach (SeatAdditionInfo seat in cinemaInfo.Seats)
                {
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

            return newCinema;
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

        public Result GetCinemaList() {

            var cinemaList = dbContext.Cinemas.Select(c => c.Name);

            if (cinemaList == null) {
                return new DataValidationResult {
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
