using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class SeatRequestInfo
    {
        public int Row { get; set; }
        public int Column { get; set; }
        public string Type { get; set; }
    }
}
