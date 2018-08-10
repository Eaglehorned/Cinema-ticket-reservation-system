using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nadim.CinemaReservationSystem.Web.Models;

namespace Nadim.CinemaReservationSystem.Web.Contracts
{
    public interface ICinemaService
    {
        ResultCreated CreateCinema(CinemaInfo cinemaInfo);

        ResultCreated CreateCinemaRoom(int cinemaId, CinemaRoomInfo cinemaRoom);

        GetResult<List<ResponseCinemaDisplayInfo>> GetCinemaList();

        Result EditCinema(int cinemaId, CinemaInfo cinemaInfo);

        GetResult<ResponseCinemaFullInfo> GetCinema(int id);

        Result EditCinemaRoom(int cinemaId, int cinemaRoomId, CinemaRoomInfo cinemaRoomInfo);

        GetResult<ResponseCinemaRoomFullInfo> GetCinemaRoom(int cinemaId, int cinemaRoomId);
    }
}
