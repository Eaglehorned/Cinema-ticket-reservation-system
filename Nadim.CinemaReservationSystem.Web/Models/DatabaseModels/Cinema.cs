using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class Cinema
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CinemaId { get; set; }
        public string City { get; set; }
        public string Name { get; set; }

        public List<CinemaRoom> CinemaRooms { get; set; }
    }
}
