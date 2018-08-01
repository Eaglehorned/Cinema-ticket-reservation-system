using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web.Contracts
{
    public interface ICinemaService
    {
        Result CreateCinema(CinemaRequestInfo cinemaInfo);

        Result GetCinemaList();

        Result EditCinema(int cinemaId, CinemaRequestInfo cinemaInfo);
    }
}
