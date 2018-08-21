using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class SessionSeatInfo
    {
        public int SessionSeatId;
        public bool Booked { get; set; }
        public DateTime LastTimeUpdated { get; set; }
    }
}
