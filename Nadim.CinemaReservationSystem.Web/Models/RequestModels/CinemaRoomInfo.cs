using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class CinemaRoomInfo
    {
        public List<SeatInfo> Seats { get; set; }
        public string Name { get; set; }
    }
}
