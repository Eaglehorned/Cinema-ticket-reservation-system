using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class CinemaReservationSystemContext : DbContext
    {
        public CinemaReservationSystemContext(DbContextOptions<CinemaReservationSystemContext> options): base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<CinemaRoom> CinemaRooms { get; set; }
    }
}
