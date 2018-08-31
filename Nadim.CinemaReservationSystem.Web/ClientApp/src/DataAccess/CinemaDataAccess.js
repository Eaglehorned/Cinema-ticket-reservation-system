import TokenService from '../Services/TokenService';
import ReceivedDataProcessingService from '../Services/ReceivedDataProcessingService';

export default class CinemaDataAccess{

    static getCinemaList = () =>{
        return CinemaDataAccess.getCinemaListFetch()
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.parseJson)
        .then(ReceivedDataProcessingService.getRequsetedData);
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
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.parseJson)
        .then(ReceivedDataProcessingService.getRequsetedData)
        .then(requestedData => CinemaDataAccess.compeleteCinemaInfoWithId(requestedData, id))
    }

    static getCinemaFetch = (id) =>{
        return fetch(`api/cinemas/${id}`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            }
        });
    }

    static createCinema = (cinemaInfo) =>{
        return CinemaDataAccess.createCinemaFetch(cinemaInfo)
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.getIdFromResponse)
    }

    static createCinemaFetch = (cinemaInfo) =>{
        return fetch('api/cinemas', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify(cinemaInfo)
        })
    }

    static editCinema = (cinemaInfo) =>{
        return CinemaDataAccess.editCinemaFetch(cinemaInfo)
        .then(ReceivedDataProcessingService.handleRequstError);
    }

    static editCinemaFetch = (cinemaInfo) =>{
        return fetch(`api/cinemas/${cinemaInfo.cinemaId}/info`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify(cinemaInfo)
        });
    }

    static getCinemaRoomList = (cinemaId) =>{
        return CinemaDataAccess.getCinemaRoomListFetch(cinemaId)
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.parseJson)
        .then(ReceivedDataProcessingService.getRequsetedData)
    }

    static getCinemaRoomListFetch = (cinemaId) =>{
        return fetch(`api/cinemas/${cinemaId}/cinemaRooms`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            }
        });
    }

    static getCinemaRoomSeatTypes = (cinemaId, cinemaRoomId) =>{
        return CinemaDataAccess.getCinemaRoomSeatTypesFetch(cinemaId, cinemaRoomId)
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.parseJson)
        .then(ReceivedDataProcessingService.getRequsetedData);
    }

    static getCinemaRoomSeatTypesFetch = (cinemaId, cinemaRoomId) =>{
        return fetch(`api/cinemas/${cinemaId}/cinemaRooms/${cinemaRoomId}/seatTypes`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            }
        });
    }

    static getCinemaRoom = (cinemaid, cinemaRoomId) =>{
        return CinemaDataAccess.getCinemaRoomFetch(cinemaid, cinemaRoomId)
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.parseJson)
        .then((cinemaInfo) => CinemaDataAccess.handleReceivedCinemaRoomInfo(cinemaInfo, cinemaRoomId));
    }

    static getCinemaRoomFetch = (cinemaId, cinemaRoomId) =>{
        return fetch(`api/cinemas/${cinemaId}/cinemaRooms/${cinemaRoomId}`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            }
        });
    }

    static createCinemaRoom = (cinemaId, cinemaRoomInfo) =>{
        return CinemaDataAccess.createCinemaRoomFetch(cinemaId, cinemaRoomInfo)
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(response => CinemaDataAccess.formCinemaRoomInfo(cinemaRoomInfo.name, ReceivedDataProcessingService.getIdFromResponse(response)));
    }

    static createCinemaRoomFetch = (cinemaId, cinemaRoomInfo) =>{
        return fetch(`api/cinemas/${cinemaId}/cinemaRooms`, {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify({
                name: cinemaRoomInfo.name,
                seats: [].concat(...cinemaRoomInfo.cinemaRoomSeats)
            })
        })
    }

    static editCinemaRoom = (cinemaId, cinemaRoomId, cinemaRoomInfo) =>{
        return CinemaDataAccess.editCinemaRoomFetch(cinemaId, cinemaRoomId, cinemaRoomInfo)
        .then(ReceivedDataProcessingService.handleRequstError);
    }

    static editCinemaRoomFetch = (cinemaId, cinemaRoomId, cinemaRoomInfo) =>{
        return fetch(`api/cinemas/${cinemaId}/cinemaRooms/${cinemaRoomId}`, {
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
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

        cinemaInfo.seats.sort((a, b) => {
            if (a.row === b.row){
                if (a.column > b.column){
                    return 1;
                }
                if (a.column < b.column){
                    return -1;
                } 
                return 0;
            }
            if (a.row > b.row){
                return 1;
            }
            return -1;
        });

        cinemaInfo.info.rows = cinemaInfo.seats[cinemaInfo.seats.length - 1].row + 1;
        cinemaInfo.info.columns = cinemaInfo.seats[cinemaInfo.seats.length - 1].column + 1;

        cinemaInfo.seats = CinemaDataAccess.convertSeatsArray(cinemaInfo.seats, cinemaInfo.info.rows, cinemaInfo.info.columns);

        return cinemaInfo;
    }

    static convertSeatsArray(seats, rows, columns){
        let seatsArray = [];
        for (let i = 0; i < rows; i++){
            seatsArray[i] = [];
            for (let j = 0; j < columns; j++) {
                seatsArray[i].push(seats[i * columns + j]);
            }
        }
        return seatsArray;
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