using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web.Contracts
{
    public interface ICinemaService
    {
        Result CreateCinema(CinemaInfo cinemaInfo);

        ResultCreated CreateCinemaRoom(int cinemaId, CinemaRoomInfo cinemaRoom);

        Result GetCinemaList();

        Result EditCinema(int cinemaId, CinemaInfo cinemaInfo);

        Result GetCinema(int id);

        ResultCreated EditCinemaRoom(int cinemaId, int cinemaRoomId, CinemaRoomInfo cinemaRoomInfo);

        Result GetCinemaRoom(int cinemaId, int cinemaRoomId);
    }
}
