using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web
{
    public class OrderService : IOrderService
    {
        private readonly CinemaReservationSystemContext dbContext;

        public OrderService(CinemaReservationSystemContext dbContext)
        {
            this.dbContext = dbContext;
        }

        private bool SessionExists(int sessionId)
        {
            return dbContext.Sessions.Any(s => s.SessionId == sessionId);
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
            if (!SessionExists(orderInfo.SessionId)) {
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
                UserId = orderInfo.UserId,
                SessionId = orderInfo.SessionId,
                Confirmed = false
            };

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
