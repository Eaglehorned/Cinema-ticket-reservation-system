﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class Session
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SessionId { get; set; }

        public int CinemaRoomId { get; set; }
        public CinemaRoom CinemaRoom { get; set; }

        public int FilmId { get; set; }
        public Film Film { get; set; }

        public DateTime BeginTime { get; set; }

        public ICollection<SessionSeatTypePrice> SessionSeatTypePrices { get; set; }
        public ICollection<SessionSeat> SessionSeats { get; set; }
    }
}
