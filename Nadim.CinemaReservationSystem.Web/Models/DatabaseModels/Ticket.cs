using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class Ticket
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TicketId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int SessionSeatId { get; set; }
        public SessionSeat SessionSeat { get; set; }
    }
}
