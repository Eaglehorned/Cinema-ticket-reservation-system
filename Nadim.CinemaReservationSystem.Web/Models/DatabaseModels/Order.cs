using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
        
        public int SessionId { get; set; }
        public Session Session { get; set; }

        public bool Confirmed { get; set; }

        public List<SessionSeat> SessionSeats { get; set; }
    }
}
