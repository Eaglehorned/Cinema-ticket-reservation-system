using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class ResponseSessionDisplayInfo
    {
        public int SessionId { get; set; }
        public string CinemaName { get; set; }
        public string CinemaCity { get; set; }
        public string CinemaRoomName { get; set; }
        public string FilmName { get; set; }
        public DateTime BeginTime { get; set; }
    }
}
