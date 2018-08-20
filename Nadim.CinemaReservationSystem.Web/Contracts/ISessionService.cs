using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web.Contracts
{
    public interface ISessionService
    {
        ResultCreated CreateSession(SessionInfo session);

        GetResult<List<ResponseSessionDisplayInfo>> GetSessionList();

        GetResult<ResponseSessionFullInfo> GetSession(int sessionId);

        Result EditSession(int sessionId, SessionInfo sessionInfo);

        GetResult<List<ResponseSessionDisplayInfo>> GetSessionList(int filmId);

        GetResult<List<SeatReservationInfo>> GetSessionSeats(int sessionId);
    }
}
