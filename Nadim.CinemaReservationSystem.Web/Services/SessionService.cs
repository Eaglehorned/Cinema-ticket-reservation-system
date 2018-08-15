using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;
using Nadim.CinemaReservationSystem.Web.Contracts;

namespace Nadim.CinemaReservationSystem.Web.Services
{
    public class SessionService : ISessionService
    {
        private readonly CinemaReservationSystemContext dbContext;

        public SessionService(CinemaReservationSystemContext dbContext)
        {
            this.dbContext = dbContext;
        }

        private bool CinemaRoomExists(int cinemaRoomId) {
            return dbContext.CinemaRooms.Any(r => r.CinemaRoomId == cinemaRoomId);
        }

        private bool SessionExist(SessionInfo session) {
            return dbContext.Sessions.Any(s =>
                s.CinemaRoomId == session.CinemaRoomId
                && s.BeginTime == session.BeginTime
                && s.FilmId == session.FilmId
            );
        }

        public ResultCreated CreateSession(SessionInfo sessionInfo)
        {
            if (!CinemaRoomExists(sessionInfo.CinemaRoomId))
            {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "Such cinema room does not exist."
                };
            }

            if (SessionExist(sessionInfo))
            {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "Such session already exists."
                };
            }

            Session session = new Session
            {
                Film = dbContext.Films.FirstOrDefault( f => f.FilmId == sessionInfo.FilmId),
                CinemaRoom = dbContext.CinemaRooms.FirstOrDefault( r => r.CinemaRoomId == sessionInfo.CinemaRoomId),
                BeginTime = sessionInfo.BeginTime,
                SessionSeatTypePrices = new List<SessionSeatTypePrice>()
            };



            session.SessionSeatTypePrices = (from seatTypePrice in sessionInfo.SessionSeatTypePrices
                                             select new SessionSeatTypePrice
                                             {
                                                 Price = seatTypePrice.Price,
                                                 SeatType = dbContext.SeatTypes.FirstOrDefault(seatType => seatType.TypeName == seatTypePrice.TypeName)
                                             })
                                             .ToList();

            dbContext.Sessions.Add(session);

            dbContext.SaveChanges();

            return new ResultCreated
            {
                ResultOk = true,
                Id = session.SessionId
            };
        }
    }
}
