using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Nadim.CinemaReservationSystem.Web.Controllers
{
    public class AddCinemaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}