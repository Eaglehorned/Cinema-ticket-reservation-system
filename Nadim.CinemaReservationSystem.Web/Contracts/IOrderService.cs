using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web
{
    public interface IOrderService
    {
        ResultCreated CreateOrder(OrderInfo order);
    }
}
