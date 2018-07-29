using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class CinemaRoomCreationInfo
    {
        public List<SeatCreationInfo> Seats { get; set; }
        public string Name { get; set; }
    }
}
