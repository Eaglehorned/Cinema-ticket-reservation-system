import TokenService from '../Services/TokenService';
import ApplicationService from '../Services/ApplicationService';

export default class CinemaDataAccess{

    static getCinemaList = () =>{
        return CinemaDataAccess.getCinemaListFetch()
        .then(ApplicationService.handleRequstError)
        .then(ApplicationService.parseJson)
        .then(ApplicationService.getRequsetedData);
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
        .then(ApplicationService.handleRequstError)
        .then(ApplicationService.parseJson)
        .then(ApplicationService.getRequsetedData)
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
        .then(ApplicationService.handleRequstError)
        .then((response) => CinemaDataAccess.formFullCinemaRoom(cinemaInfo, CinemaDataAccess.getIdFromResponse(response)))
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

    static getCinemaRoom  = (cinemaid, cinemaRoomId) =>{
        return CinemaDataAccess.getCinemaRoomFetch(cinemaid, cinemaRoomId)
        .then(ApplicationService.handleRequstError)
        .then(ApplicationService.parseJson)
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

    static completeCinemaInfoWithCinemaRooms = (cinemaInfo) =>{
        cinemaInfo.cinemaRooms = [];
        return cinemaInfo;
    }

    static formFullCinemaRoom = (cinemaInfo, id) =>{
        let tempCinema = {};
        tempCinema.info = cinemaInfo;
        CinemaDataAccess.compeleteCinemaInfoWithId(tempCinema, id);
        tempCinema.cinemaRooms = [];
        return tempCinema;
    }

    static compeleteCinemaInfoWithId = (requestedData, id) =>{
        requestedData.info.cinemaId = id;
        return requestedData;
    }

    static createCinemaRoom = (cinemaId, cinemaRoomInfo) =>{
        return CinemaDataAccess.createCinemaRoomFetch(cinemaId, cinemaRoomInfo)
        .then(ApplicationService.handleRequstError)
        .then(response => CinemaDataAccess.formCinemaRoomInfo(cinemaRoomInfo.name, ApplicationService.getIdFromResponse(response)));
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
    
    static formCinemaRoomInfo = (name, cinemaRoomId) =>{
        let cinemaRoom = {};
        cinemaRoom.name = name;
        cinemaRoom.cinemaRoomId = cinemaRoomId;
        return cinemaRoom;
    }
}