﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web
{
    public class Result
    {
        public bool ResultOk { get; set; }
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

    public class ResultCreated : Result
    {
        public int Id { get; set; }
    }

    public class GetResult<T> : Result {
        public T RequestedData { get; set; }
    }
}
