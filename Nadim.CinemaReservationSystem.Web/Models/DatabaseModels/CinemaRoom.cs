using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class CinemaRoom
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CinemaRoomId { get; set; }
        public string Name { get; set; }

        public int CinemaId { get; set; }
        public Cinema Cinema { get; set; }

        public List<Seat> Seats { get; set; }
    }
}
