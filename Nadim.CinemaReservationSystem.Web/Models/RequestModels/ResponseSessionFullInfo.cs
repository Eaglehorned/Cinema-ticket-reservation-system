using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class ResponseSessionFullInfo
    {
        public int SessionId { get; set; }
        public int CinemaId { get; set; }
        public int FilmId { get; set; }
        public DateTime BeginTime { get; set; }

        public List<SessionSeatTypePriceFullInfo> SessionSeatTypePrices { get; set; }
    }
}
