using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class ResponseSessionDisplayInfo
    {
        public int SessionId { get; set; }
        public ResponseCinemaDisplayInfo Cinema { get; set; }
        public ResponseCinemaRoomDisplayInfo CinemaRoom { get; set; }
        public ResponseFilmDisplayInfo Film { get; set; }
        public DateTime BeginTime { get; set; }
    }
}
