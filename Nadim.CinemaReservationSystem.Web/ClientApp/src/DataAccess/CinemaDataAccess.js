import authorizationService from '../Services/AuthorizationService';
import receivedDataProcessingHelper from '../Helper/ReceivedDataProcessingHelper';
import seatsHelper from '../Helper/SeatsHelper';

const getCinemaListFetch = () =>{
    return fetch('api/cinemas', {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

const getCinemaFetch = (id) =>{
    return fetch(`api/cinemas/${id}`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const createCinemaFetch = (cinemaInfo) =>{
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

const editCinemaFetch = (cinemaInfo) =>{
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

const getCinemaRoomListFetch = (cinemaId) =>{
    return fetch(`api/cinemas/${cinemaId}/cinemaRooms`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const getCinemaRoomSeatTypesFetch = (cinemaId, cinemaRoomId) =>{
    return fetch(`api/cinemas/${cinemaId}/cinemaRooms/${cinemaRoomId}/seatTypes`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const handleReceivedCinemaRoomInfo = (requestedData) =>{
    let cinemaInfo = {};
    cinemaInfo.info = {};
    cinemaInfo.info.name = requestedData.name;
    cinemaInfo.info.cinemaRoomId = requestedData.cinemaRoomId;
    cinemaInfo.seats = requestedData.seats;

    cinemaInfo.seats = seatsHelper.sortSeats(requestedData.seats);

    cinemaInfo.info.rows = seatsHelper.getSeatsRowsNumber(cinemaInfo.seats);
    cinemaInfo.info.columns = seatsHelper.getSeatsColumnsNumber(cinemaInfo.seats);

    cinemaInfo.seats = seatsHelper.convertSeatsArray(cinemaInfo.seats, cinemaInfo.info.rows, cinemaInfo.info.columns);

    return cinemaInfo;
}

const getCinemaRoomFetch = (cinemaId, cinemaRoomId) =>{
    return fetch(`api/cinemas/${cinemaId}/cinemaRooms/${cinemaRoomId}`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const createCinemaRoomFetch = (cinemaId, cinemaRoomInfo) =>{
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

const formCinemaRoomInfo = (name, cinemaRoomId) =>{
    let cinemaRoom = {};
    cinemaRoom.name = name;
    cinemaRoom.cinemaRoomId = cinemaRoomId;
    return cinemaRoom;
}

const editCinemaRoomFetch = (cinemaId, cinemaRoomId, cinemaRoomInfo) =>{
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

class CinemaDataAccess{

    getCinemaList = () =>{
        return getCinemaListFetch()
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequsetedData);
    }

    getCinema = (id) =>{
        return getCinemaFetch(id)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequsetedData);
    }

    createCinema = (cinemaInfo) =>{
        return createCinemaFetch(cinemaInfo)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.getIdFromResponse)
    }

    editCinema = (cinemaInfo) =>{
        return editCinemaFetch(cinemaInfo)
        .then(receivedDataProcessingHelper.handleRequstError);
    }

    getCinemaRoomList = (cinemaId) =>{
        return getCinemaRoomListFetch(cinemaId)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequsetedData)
    }

    getCinemaRoomSeatTypes = (cinemaId, cinemaRoomId) =>{
        return getCinemaRoomSeatTypesFetch(cinemaId, cinemaRoomId)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequsetedData);
    }

    getCinemaRoom = (cinemaid, cinemaRoomId) =>{
        return getCinemaRoomFetch(cinemaid, cinemaRoomId)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequsetedData)
        .then(handleReceivedCinemaRoomInfo);
    }

    createCinemaRoom = (cinemaId, cinemaRoomInfo) =>{
        return createCinemaRoomFetch(cinemaId, cinemaRoomInfo)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(response => formCinemaRoomInfo(cinemaRoomInfo.name, receivedDataProcessingHelper.getIdFromResponse(response)));
    }

    editCinemaRoom = (cinemaId, cinemaRoomId, cinemaRoomInfo) =>{
        return editCinemaRoomFetch(cinemaId, cinemaRoomId, cinemaRoomInfo)
        .then(receivedDataProcessingHelper.handleRequstError);
    }
}

const cinemaDataAccess = new CinemaDataAccess();

export default cinemaDataAccess;
