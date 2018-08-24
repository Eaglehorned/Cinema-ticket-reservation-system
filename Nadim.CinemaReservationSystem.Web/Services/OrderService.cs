using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace Nadim.CinemaReservationSystem.Web
{
    public class OrderService : IOrderService
    {
        private readonly CinemaReservationSystemContext dbContext;

        public OrderService(CinemaReservationSystemContext dbContext)
        {
            this.dbContext = dbContext;
        }

        private bool SessionExists(int sessionSeatId)
        {
            return dbContext.SessionSeats
                .Include(ss => ss.Session)
                .FirstOrDefault(ss => ss.SessionSeatId == sessionSeatId).Session != null;
        }

        private bool ValidateSeatList(List<int> list)
        {
            return list == null || list.Count == 0 && list.Count <= 10;
        }

        private bool UserExists(int userId) {
            return dbContext.Users.Any(u => u.UserId == userId);
        }

        private bool SessionSeatExist(int sessionSeatId)
        {
            return dbContext.SessionSeats.Any(ss => ss.SessionSeatId == sessionSeatId);
        }

        public ResultCreated CreateOrder(OrderInfo orderInfo)
        {
            if (ValidateSeatList(orderInfo.SessionSeats))
            {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "Invalid seats information."
                };
            }

            if (!SessionExists(orderInfo.SessionSeats.FirstOrDefault())) {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "Such session does not exist."
                };
            }

            if (!UserExists(orderInfo.UserId))
            {
                return new ResultCreated
                {
                    ResultOk = false,
                    Details = "Such user does not exist."
                };
            }

            Order order = new Order
            {
                UserId = orderInfo.UserId
            };

            foreach (var sessionSeatId in orderInfo.SessionSeats)
            {
                order.SessionSeats.Add(
                    dbContext.SessionSeats
                        .FirstOrDefault(ss => ss.SessionSeatId == sessionSeatId)
                );
            }

            dbContext.Orders.Add(order);
            dbContext.SaveChanges();

            return new ResultCreated
            {
                ResultOk = true,
                Id = order.OrderId
            };
        }
    }
}
