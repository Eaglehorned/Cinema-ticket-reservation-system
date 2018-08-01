using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class CinemaRequestInfo
    {
        public string City { get; set; }
        public string Name { get; set; }
        public List<CinemaRoomRequestInfo> CinemaRooms { get; set; }
        public decimal VipSeatPrice { get; set; }
        public decimal DefaultSeatPrice { get; set; }
    }
}
