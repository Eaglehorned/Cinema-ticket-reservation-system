using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;
using Nadim.CinemaReservationSystem.Web.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Nadim.CinemaReservationSystem.Web.Services
{
    public class SessionService : ISessionService
    {
        private readonly CinemaReservationSystemContext dbContext;

        public SessionService(CinemaReservationSystemContext dbContext)
        {
            this.dbContext = dbContext;
        }

        private bool CinemaRoomExists(int cinemaRoomId)
        {
            return dbContext.CinemaRooms.Any(r => r.CinemaRoomId == cinemaRoomId);
        }

        private bool SessionExist(SessionInfo session)
        {
            return dbContext.Sessions.Any(s =>
                s.CinemaRoomId == session.CinemaRoomId
                && s.BeginTime == session.BeginTime
                && s.FilmId == session.FilmId
            );
        }

        private bool SessionExist(int sessionId)
        {
            return dbContext.Sessions.Any(s => s.SessionId == sessionId);
        }

        private bool ValidateData(SessionInfo session) {
            return dbContext.CinemaRooms.Any(s => s.CinemaRoomId == session.CinemaRoomId)
                && dbContext.Films.Any(f => f.FilmId == f.FilmId
                && session.BeginTime.Date > DateTime.Now.Date);
        }

        private bool EnsureDontCrossWithPrevSession(int sessionId, SessionInfo session)
        {
            var sessionBeforePassedSession = dbContext.Sessions
                .Include( s=>s.Film )
                .Where(s => s.CinemaRoomId == session.CinemaRoomId
                   && session.BeginTime.AddDays(-1).Date <= s.BeginTime.Date
                   && s.BeginTime < session.BeginTime
                   && s.SessionId != sessionId)
                .OrderBy(s => s.BeginTime)
                .LastOrDefault();

            if (sessionBeforePassedSession == null)
            {
                return true;
            }

            if (session.BeginTime < sessionBeforePassedSession.BeginTime.AddSeconds(sessionBeforePassedSession.Film.Duration))
            {
                return false;
            }
            return true;
        }

        private bool EnsureDontCrossWithPrevSession(SessionInfo session)
        {
            var sessionBeforePassedSession = dbContext.Sessions
                .Include(s => s.Film)
                .Where(s => s.CinemaRoomId == session.CinemaRoomId
                   && session.BeginTime.AddDays(-1).Date <= s.BeginTime.Date
                   && s.BeginTime < session.BeginTime)
                .OrderBy(s => s.BeginTime)
                .LastOrDefault();

            if (sessionBeforePassedSession == null)
            {
                return true;
            }

            if (session.BeginTime < sessionBeforePassedSession.BeginTime.AddSeconds(sessionBeforePassedSession.Film.Duration))
            {
                return false;
            }
            return true;
        }

        private bool EnsureDontCrossWithNextSession(SessionInfo session)
        {
            var sessionAfterPassedSession = dbContext.Sessions
                .Include(s => s.Film)
                .Where(s => s.CinemaRoomId == session.CinemaRoomId
                   && s.BeginTime.Date <= session.BeginTime.AddDays(1).Date
                   && session.BeginTime < s.BeginTime)
                .OrderBy(s => s.BeginTime)
                .FirstOrDefault();

            if (sessionAfterPassedSession == null)
            {
                return true;
            }

            if (sessionAfterPassedSession.BeginTime < session.BeginTime.AddSeconds(dbContext.Films
                .FirstOrDefault(f => f.FilmId == session.FilmId).Duration))
            {
                return false;
            }
            return true;
        }

        private bool EnsureDontCrossWithNextSession(int sessionId, SessionInfo session)
        {
            var sessionAfterPassedSession = dbContext.Sessions
                .Include(s => s.Film)
                .Where(s => s.CinemaRoomId == session.CinemaRoomId
                   && s.BeginTime.Date <= session.BeginTime.AddDays(1).Date
                   && session.BeginTime < s.BeginTime
                   && s.SessionId != sessionId)
                .OrderBy(s => s.BeginTime)
                .FirstOrDefault();

            if (sessionAfterPassedSession == null)
            {
                return true;
            }

            if (sessionAfterPassedSession.BeginTime < session.BeginTime.AddSeconds(dbContext.Films
                .FirstOrDefault(f => f.FilmId == session.FilmId).Duration))
            {
                return false;
            }
            return true;
        }

        private bool FilmGoesAtThisTime(SessionInfo session) {
            return dbContext.Films
                .Any(f => f.FilmId == session.FilmId 
                && f.StartDate.Date <= session.BeginTime.Date 
                && session.BeginTime.Date <= f.EndDate.Date);
        }

        public GetResult<List<ResponseSessionDisplayInfo>> GetSessionList(int filmId)
        {
            return new GetResult<List<ResponseSessionDisplayInfo>>
            {
                ResultOk = true,
                RequestedData = dbContext.Sessions
                .Where( s => filmId == s.FilmId)
                    .Select(s => new ResponseSessionDisplayInfo
                    {
                        SessionId = s.SessionId,
                        FilmName = s.Film.Name,
                        CinemaRoomName = s.CinemaRoom.Name,
                        CinemaName = s.CinemaRoom.Cinema.Name,
                        CinemaCity = s.CinemaRoom.Cinema.City,
                        BeginTime = s.BeginTime
                    }).ToList()
            };
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

            if (!EnsureDontCrossWithPrevSession(sessionInfo))
            {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "At this time previous session will go on."
                };
            }

            if (!EnsureDontCrossWithNextSession(sessionInfo))
            {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "At this time next session will go on."
                };
            }

            if (!FilmGoesAtThisTime(sessionInfo))
            {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "Film does not go at this time"
                };
            }

            Session session = new Session
            {
                FilmId = sessionInfo.FilmId,
                CinemaRoomId = sessionInfo.CinemaRoomId,
                BeginTime = sessionInfo.BeginTime,
                SessionSeatTypePrices = new List<SessionSeatTypePrice>()
            };

            session.SessionSeatTypePrices = sessionInfo.SessionSeatTypePrices
                .Select(stp => new SessionSeatTypePrice
                {
                    Price = stp.Price,
                    SeatTypeId = stp.SeatTypeId
                }).ToList();

            dbContext.Sessions.Add(session);

            dbContext.SaveChanges();

            return new ResultCreated
            {
                ResultOk = true,
                Id = session.SessionId
            };
        }

        public GetResult<List<ResponseSessionDisplayInfo>> GetSessionList()
        {
            return new GetResult<List<ResponseSessionDisplayInfo>>
            {
                ResultOk = true,
                RequestedData = dbContext.Sessions
                    .Select(s => new ResponseSessionDisplayInfo
                    {
                        SessionId = s.SessionId,
                        FilmName = s.Film.Name,
                        CinemaRoomName = s.CinemaRoom.Name,
                        CinemaName = s.CinemaRoom.Cinema.Name,
                        CinemaCity = s.CinemaRoom.Cinema.City,
                        BeginTime = s.BeginTime
                    }).ToList()
            };
        }

        public GetResult<ResponseSessionFullInfo> GetSession(int sessionId)
        {
            if (!SessionExist(sessionId))
            {
                return new GetResult<ResponseSessionFullInfo>
                {
                    ResultOk = false,
                    Details = "Cant find such session."
                };
            }

            return new GetResult<ResponseSessionFullInfo>
            {
                ResultOk = true,
                RequestedData = dbContext.Sessions
                    .Where(s => s.SessionId == sessionId)
                    .Select(s => new ResponseSessionFullInfo
                    {
                        SessionId = s.SessionId,
                        Cinema = new ResponseCinemaDisplayInfo
                        {
                            Name = s.CinemaRoom.Cinema.Name,
                            City = s.CinemaRoom.Cinema.City,
                            CinemaId = s.CinemaRoom.CinemaId
                        },
                        CinemaRoom = new ResponseCinemaRoomDisplayInfo
                        {
                            Name = s.CinemaRoom.Name,
                            CinemaRoomId = s.CinemaRoom.CinemaRoomId
                        },
                        Film = new ResponseFilmDisplayInfo
                        {
                            Name = s.Film.Name,
                            FilmId = s.Film.FilmId
                        },
                        BeginTime = s.BeginTime,
                        SessionSeatTypePrices = s.SessionSeatTypePrices
                           .Select(stp => new SessionSeatTypePriceFullInfo
                           {
                               SeatTypeId = stp.SeatTypeId,
                               TypeName = stp.SeatType.TypeName,
                               Price = stp.Price
                           }).ToList()
                    })
                    .FirstOrDefault()
            };
        }

        public Result EditSession(int sessionId, SessionInfo sessionInfo)
        {
            if (!SessionExist(sessionId))
            {
                return new Result
                {
                    ResultOk = false,
                    Details = "Such cinema does not exist."
                };
            }

            if (!ValidateData(sessionInfo)) {
                return new Result
                {
                    ResultOk = false,
                    Details = "Invalid data."
                };
            }

            if (!EnsureDontCrossWithPrevSession(sessionId, sessionInfo))
            {
                return new Result
                {
                    ResultOk = false,
                    Details = "At this time previous session will go on."
                };
            }

            if (!EnsureDontCrossWithNextSession(sessionId, sessionInfo))
            {
                return new Result
                {
                    ResultOk = false,
                    Details = "At this time next session will go on."
                };
            }

            if (!FilmGoesAtThisTime(sessionInfo))
            {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "Film does not go at this time"
                };
            }

            Session session = dbContext.Sessions
                .Include( s => s.SessionSeatTypePrices)
                .FirstOrDefault(s => s.SessionId == sessionId);

            session.FilmId = sessionInfo.FilmId;
            session.CinemaRoomId = sessionInfo.CinemaRoomId;
            session.BeginTime = sessionInfo.BeginTime;
            session.SessionSeatTypePrices = sessionInfo.SessionSeatTypePrices
                .Select( stp => new SessionSeatTypePrice {
                    Price = stp.Price,
                    SeatTypeId = stp.SeatTypeId
                }).ToList();

            dbContext.SaveChanges();

            return new Result
            {
                ResultOk = true
            };
        }
    }
}
