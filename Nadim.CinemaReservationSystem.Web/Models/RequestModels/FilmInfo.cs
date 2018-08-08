using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class FilmInfo
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Duration { get; set; }
        public string Description { get; set; }
    }
}
