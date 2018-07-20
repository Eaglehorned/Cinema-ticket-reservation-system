using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nadim.CinemaReservationSystem.Web
{
    public class Response
    {
        public string Status { get; set; }
        public string Details { get; set; }
    }

    public class ResponseWithId : Response
    {
        public int Id { get; set; }
    }

    public class ResponseWithToken : Response
    {
        public string Token { get; set; }
    }
}
