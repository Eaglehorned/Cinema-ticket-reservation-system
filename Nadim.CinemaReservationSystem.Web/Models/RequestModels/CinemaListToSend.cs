using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class CinemaListToSend
    {
        public int CinemaId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
    }
}
