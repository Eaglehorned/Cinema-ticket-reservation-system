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

        GetResult<IEnumerable<ResponseSessionDisplayInfo>> GetSessionList(SessionFilter filter);

        GetResult<ResponseSessionFullInfo> GetSession(int sessionId);

        Result EditSession(int sessionId, SessionInfo sessionInfo);

        GetResult<IEnumerable<SeatReservationInfo>> GetSessionSeats(int sessionId, DateTime? lastTimeUpdated);

        Result EditSessionSeat(int sessionId, int sessionSeatId, SessionSeatInfo seatInfo);
    }
}
