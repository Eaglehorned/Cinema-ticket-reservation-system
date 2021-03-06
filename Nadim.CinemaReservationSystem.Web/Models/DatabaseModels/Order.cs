﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<SessionSeat> SessionSeats { get; set; }
    }
}
