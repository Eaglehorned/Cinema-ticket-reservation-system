﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class Seat
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SeatId { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }

        public SeatType Type { get; set; }
        public int SeatTypeId { get; set; }

        public int CinemaRoomId { get; set; }
        public CinemaRoom CinemaRoom { get; set; }

    }
}
