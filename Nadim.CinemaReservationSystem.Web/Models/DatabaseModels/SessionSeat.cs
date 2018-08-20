using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class SessionSeat
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SessionSeatId { get; set; }

        public int SessionId { get; set; }
        public Session Session { get; set; }

        public int SeatId { get; set; }
        public Seat Seat { get; set; }

        public bool Booked { get; set; }
        public DateTime? LockedTime { get; set; }
    }
}
