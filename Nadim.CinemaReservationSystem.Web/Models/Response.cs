using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

    public class LoginResult : RegistrationResult {
        public string FullUserName { get; set; }
    }
}
