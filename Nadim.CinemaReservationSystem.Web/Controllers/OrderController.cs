using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Nadim.CinemaReservationSystem.Web.Contracts;
using Nadim.CinemaReservationSystem.Web.Models;
using Microsoft.AspNetCore.Authorization;

namespace Nadim.CinemaReservationSystem.Web.Controllers
{
    [Route("api/orders")]
    public class OrderController : Controller
    {
        private readonly IOrderService orderService;

        public OrderController(IOrderService orderService)
        {
            this.orderService = orderService;
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateOrder([FromBody]OrderInfo order)
        {
            ResultCreated result = orderService.CreateOrder(order);

            if (result.ResultOk)
            {
                return Created($"api/orders/{result.Id}", typeof(Order));
            }
            return BadRequest(result);
        }
    }
}