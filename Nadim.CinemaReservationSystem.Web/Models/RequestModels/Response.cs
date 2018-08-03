using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web
{
    public class Result
    {
        public bool ResultOk { get; set; }
    }

    public class DataValidationResult : Result
    {
        public string Details { get; set; }
    }

    public class RegistrationResult : Result
    {
        public string Token { get; set; }
    }

    public class LoginResult : RegistrationResult
    {
        public string FullUserName { get; set; }
    }

    public class GetCinemaListResult : Result
    {
        public dynamic CinemaList { get; set; }
    }

    public class GetCinemaResult : Result
    {
        public dynamic Cinema { get; set; }
    }

    public class GetCinemaRoomResult : Result
    {
        public dynamic CinemaRoom { get; set; }
    }

    public class ResultCreated: Result {
        public int Id { get; set; }
    }
}
