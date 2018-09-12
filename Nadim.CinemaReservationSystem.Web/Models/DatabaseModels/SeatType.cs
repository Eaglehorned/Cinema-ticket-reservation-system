using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class SeatType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SeatTypeId { get; set; }
        public string TypeName { get; set; }

        public ICollection<SessionSeatTypePrice> SessionSeatTypePrices { get; set; }
    }
}
