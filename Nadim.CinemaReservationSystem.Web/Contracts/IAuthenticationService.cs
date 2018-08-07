using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web.Contracts
{
    public interface IAuthenticationService
    {
        Result Login(UserLoginInfo user);
        Result Register(UserRegistrationInfo user);
    }
}
