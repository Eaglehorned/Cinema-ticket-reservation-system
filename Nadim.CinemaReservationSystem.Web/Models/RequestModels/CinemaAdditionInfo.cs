using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class CinemaAdditionInfo
    {
        public string City { get; set; }
        public string Name { get; set; }
        public int CinemaRoomsCount { get; set; }
        public List<SeatAdditionInfo> Seats { get; set; } 
        public string CurrentUsername { get; set; }
    }
}
