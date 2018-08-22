using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class OrderInfo
    {
        public int UserId { get; set; }
        public int SessionId { get; set; }
        public bool Confirmed { get; set; }
    }
}
