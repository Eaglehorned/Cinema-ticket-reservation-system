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
        bool UserExists(CinemaReservationSystemContext dbContext, string userEmail);
        bool InputLoginDataValid(UserLoginInfo user);
        bool InputRegistrationDataValid(UserRegistrationInfo user);
        bool IsUserDataCorrect(CinemaReservationSystemContext dbContext, UserLoginInfo user);
        string GenerateToken(IConfiguration configuration, string userEmail);
        Result ValidateLoginData(CinemaReservationSystemContext dbContext, IConfiguration configuration, UserLoginInfo user);
        Result ValidateRegisterData(CinemaReservationSystemContext dbContext, IConfiguration configuration, UserRegistrationInfo user);
    }
}
