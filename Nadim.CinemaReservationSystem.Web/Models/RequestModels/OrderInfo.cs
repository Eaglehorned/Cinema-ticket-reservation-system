using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class OrderInfo
    {
        public int UserId { get; set; }
        public IEnumerable<int> SessionSeats { get; set; }
    }
}
