using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;
using Microsoft.Extensions.Configuration;

namespace Nadim.CinemaReservationSystem.Web.Contracts
{
    public interface IAuthenticationService
    {
        Result Login(CinemaReservationSystemContext dbContext, IConfiguration configuration, UserLoginInfo user);
        Result Register(CinemaReservationSystemContext dbContext, IConfiguration configuration, UserRegistrationInfo user);
    }
}
