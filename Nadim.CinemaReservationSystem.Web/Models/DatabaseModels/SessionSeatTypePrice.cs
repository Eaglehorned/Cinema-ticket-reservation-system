using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class SessionSeatTypePrice
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SessionSeatTypePriceId { get; set; }

        public int SessionId { get; set; }
        public Session Session { get; set; }

        public int SeatTypeId { get; set; }
        public SeatType SeatType { get; set; }

        public decimal Price { get; set; }
    }
}
