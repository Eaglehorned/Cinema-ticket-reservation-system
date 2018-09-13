using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class SessionInfo
    {
        public int FilmId { get; set; }
        public int CinemaRoomId { get; set; }
        public DateTime BeginTime { get; set; }
        
        public IEnumerable<SessionSeatTypePriceInfo> SessionSeatTypePrices { get; set; }
    }
}
