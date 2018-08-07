using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class ResponseCinemaFullInfo {
        public CinemaInfo Info { get; set; }
        public List<ResponseCinemaRoomDisplayInfo> CinemaRooms { get; set; }
    }
}
