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
        public List<ResponseCinemaDisplayInfo> CinemaList { get; set; }
    }

    public class GetCinemaResult : Result
    {
        public ResponseCinemaFullInfo Info { get; set; }
    }

    public class GetCinemaRoomResult : Result
    {
        public ResponseCinemaRoomFullInfo CinemaRoom { get; set; }
    }

    public class ResultCreated : DataValidationResult
    {
        public int Id { get; set; }
    }
}
