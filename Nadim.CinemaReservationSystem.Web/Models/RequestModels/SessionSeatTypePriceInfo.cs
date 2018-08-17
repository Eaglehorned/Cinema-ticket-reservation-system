using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class SessionSeatTypePriceInfo
    {
        public int SeatTypeId { get; set; }
        public decimal Price { get; set; }
    }

    public class SessionSeatTypePriceFullInfo : SessionSeatTypePriceInfo
    {
        public string TypeName { get; set; }
    }
}
