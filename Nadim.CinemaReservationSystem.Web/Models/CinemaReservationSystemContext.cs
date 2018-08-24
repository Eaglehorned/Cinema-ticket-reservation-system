using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Nadim.CinemaReservationSystem.Web.Models
{
    public class CinemaReservationSystemContext : DbContext
    {
        public CinemaReservationSystemContext(DbContextOptions<CinemaReservationSystemContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CinemaRoom>()
                .HasOne(r => r.Cinema)
                .WithMany(c => c.CinemaRooms)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Seat>()
                .HasOne(s => s.CinemaRoom)
                .WithMany(r => r.Seats)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SessionSeatTypePrice>()
                .HasKey(stp => new { stp.SessionId, stp.SeatTypeId });

            modelBuilder.Entity<SessionSeatTypePrice>()
                .HasOne(stp => stp.Session)
                .WithMany(s => s.SessionSeatTypePrices)
                .HasForeignKey(stp => stp.SessionId);

            modelBuilder.Entity<SessionSeatTypePrice>()
                .HasOne(stp => stp.SeatType)
                .WithMany(s => s.SessionSeatTypePrices)
                .HasForeignKey(stp => stp.SeatTypeId);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<CinemaRoom> CinemaRooms { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Film> Films { get; set; }
        public DbSet<SeatType> SeatTypes { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<SessionSeat> SessionSeats { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<SessionSeatTypePrice> SessionSeatTypePrices { get; set; }
    }
}
