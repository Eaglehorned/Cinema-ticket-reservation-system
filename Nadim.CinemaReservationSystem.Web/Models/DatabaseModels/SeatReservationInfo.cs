using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class SeatReservationInfo : SeatInfo
    {
        public int SessionSeatId { get; set; }
        public bool Booked { get; set; }
    }
}
