import authorizationService from '../Services/AuthorizationService';
import ReceivedDataProcessingHelper from '../Helper/ReceivedDataProcessingHelper';
import SeatsHelper from '../Helper/SeatsHelper';

export default class CinemaDataAccess{

    static getCinemaList = () =>{
        return CinemaDataAccess.getCinemaListFetch()
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.parseJson)
        .then(ReceivedDataProcessingHelper.getRequsetedData);
    }

    static getCinemaListFetch = () =>{
        return fetch('api/cinemas', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    static getCinema = (id) =>{
        return CinemaDataAccess.getCinemaFetch(id)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.parseJson)
        .then(ReceivedDataProcessingHelper.getRequsetedData)
        .then(requestedData => CinemaDataAccess.compeleteCinemaInfoWithId(requestedData, id))
    }

    static getCinemaFetch = (id) =>{
        return fetch(`api/cinemas/${id}`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            }
        });
    }

    static createCinema = (cinemaInfo) =>{
        return CinemaDataAccess.createCinemaFetch(cinemaInfo)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.getIdFromResponse)
    }

    static createCinemaFetch = (cinemaInfo) =>{
        return fetch('api/cinemas', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            },
            body: JSON.stringify(cinemaInfo)
        })
    }

    static editCinema = (cinemaInfo) =>{
        return CinemaDataAccess.editCinemaFetch(cinemaInfo)
        .then(ReceivedDataProcessingHelper.handleRequstError);
    }

    static editCinemaFetch = (cinemaInfo) =>{
        return fetch(`api/cinemas/${cinemaInfo.cinemaId}/info`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            },
            body: JSON.stringify(cinemaInfo)
        });
    }

    static getCinemaRoomList = (cinemaId) =>{
        return CinemaDataAccess.getCinemaRoomListFetch(cinemaId)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.parseJson)
        .then(ReceivedDataProcessingHelper.getRequsetedData)
    }

    static getCinemaRoomListFetch = (cinemaId) =>{
        return fetch(`api/cinemas/${cinemaId}/cinemaRooms`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            }
        });
    }

    static getCinemaRoomSeatTypes = (cinemaId, cinemaRoomId) =>{
        return CinemaDataAccess.getCinemaRoomSeatTypesFetch(cinemaId, cinemaRoomId)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.parseJson)
        .then(ReceivedDataProcessingHelper.getRequsetedData);
    }

    static getCinemaRoomSeatTypesFetch = (cinemaId, cinemaRoomId) =>{
        return fetch(`api/cinemas/${cinemaId}/cinemaRooms/${cinemaRoomId}/seatTypes`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            }
        });
    }

    static getCinemaRoom = (cinemaid, cinemaRoomId) =>{
        return CinemaDataAccess.getCinemaRoomFetch(cinemaid, cinemaRoomId)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.parseJson)
        .then((cinemaInfo) => CinemaDataAccess.handleReceivedCinemaRoomInfo(cinemaInfo, cinemaRoomId));
    }

    static getCinemaRoomFetch = (cinemaId, cinemaRoomId) =>{
        return fetch(`api/cinemas/${cinemaId}/cinemaRooms/${cinemaRoomId}`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            }
        });
    }

    static createCinemaRoom = (cinemaId, cinemaRoomInfo) =>{
        return CinemaDataAccess.createCinemaRoomFetch(cinemaId, cinemaRoomInfo)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(response => CinemaDataAccess.formCinemaRoomInfo(cinemaRoomInfo.name, ReceivedDataProcessingHelper.getIdFromResponse(response)));
    }

    static createCinemaRoomFetch = (cinemaId, cinemaRoomInfo) =>{
        return fetch(`api/cinemas/${cinemaId}/cinemaRooms`, {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            },
            body: JSON.stringify({
                name: cinemaRoomInfo.name,
                seats: [].concat(...cinemaRoomInfo.cinemaRoomSeats)
            })
        })
    }

    static editCinemaRoom = (cinemaId, cinemaRoomId, cinemaRoomInfo) =>{
        return CinemaDataAccess.editCinemaRoomFetch(cinemaId, cinemaRoomId, cinemaRoomInfo)
        .then(ReceivedDataProcessingHelper.handleRequstError);
    }

    static editCinemaRoomFetch = (cinemaId, cinemaRoomId, cinemaRoomInfo) =>{
        return fetch(`api/cinemas/${cinemaId}/cinemaRooms/${cinemaRoomId}`, {
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            },
            body: JSON.stringify({
                name: cinemaRoomInfo.name,
                seats: [].concat(...cinemaRoomInfo.cinemaRoomSeats)
            })
        });
    }

    static handleReceivedCinemaRoomInfo(cinemaRoomInfo, cinemaRoomId){
        let cinemaInfo = {};
        cinemaInfo.info = {};
        cinemaInfo.info.name = cinemaRoomInfo.requestedData.name;
        cinemaInfo.info.cinemaRoomId = cinemaRoomId;
        cinemaInfo.seats = cinemaRoomInfo.requestedData.seats;

        cinemaInfo.seats = SeatsHelper.sortSeats(cinemaRoomInfo.requestedData.seats);

        cinemaInfo.info.rows = SeatsHelper.getSeatsRowsNumber(cinemaInfo.seats);
        cinemaInfo.info.columns = SeatsHelper.getSeatsColumnsNumber(cinemaInfo.seats);

        cinemaInfo.seats = SeatsHelper.convertSeatsArray(cinemaInfo.seats, cinemaInfo.info.rows, cinemaInfo.info.columns);

        return cinemaInfo;
    }

    static compeleteCinemaInfoWithId = (cinemaInfo, id) =>{
        cinemaInfo.info.cinemaId = id;
        return cinemaInfo;
    }
    
    static formCinemaRoomInfo = (name, cinemaRoomId) =>{
        let cinemaRoom = {};
        cinemaRoom.name = name;
        cinemaRoom.cinemaRoomId = cinemaRoomId;
        return cinemaRoom;
    }
}