import receivedDataProcessingHelper from '../Helper/ReceivedDataProcessingHelper';
import seatsHelper from '../Helper/SeatsHelper';
import userService from '../Services/UserService';

const sendRequestToGetCinemaList = () =>{
    return fetch('api/cinemas', {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

const sendRequestToGetCinema = (id) =>{
    return fetch(`api/cinemas/${id}`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        }
    });
}

const sendRequestToCreateCinema = (cinemaInfo) =>{
    return fetch('api/cinemas', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        },
        body: JSON.stringify(cinemaInfo)
    })
}

const sendRequestToEditCinema = (cinemaInfo) =>{
    return fetch(`api/cinemas/${cinemaInfo.cinemaId}/info`, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        },
        body: JSON.stringify(cinemaInfo)
    });
}

const sendRequestToGetCinemaRoomList = (cinemaId) =>{
    return fetch(`api/cinemas/${cinemaId}/cinemaRooms`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        }
    });
}

const sendRequestToGetCinemaRoomSeatTypes = (cinemaId, cinemaRoomId) =>{
    return fetch(`api/cinemas/${cinemaId}/cinemaRooms/${cinemaRoomId}/seatTypes`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        }
    });
}

const createRequestedCinemaRoomInfo = (requestedData) =>{
    const cinemaInfo = {
        info:{
            name: requestedData.name,
            cinemaRoomId: requestedData.cinemaRoomId
        },
        seats: seatsHelper.sortSeats(requestedData.seats)
    };

    cinemaInfo.info.rows = seatsHelper.getSeatsRowsNumber(cinemaInfo.seats);
    cinemaInfo.info.columns = seatsHelper.getSeatsColumnsNumber(cinemaInfo.seats);

    cinemaInfo.seats = seatsHelper.convertSeatsArray(cinemaInfo.seats, cinemaInfo.info.rows, cinemaInfo.info.columns);

    return cinemaInfo;
}

const sendRequestToGetCinemaRoom = (cinemaId, cinemaRoomId) =>{
    return fetch(`api/cinemas/${cinemaId}/cinemaRooms/${cinemaRoomId}`, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        }
    });
}

const sendRequestToCreateCinemaRoom = (cinemaId, cinemaRoomInfo) =>{
    return fetch(`api/cinemas/${cinemaId}/cinemaRooms`, {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        },
        body: JSON.stringify({
            name: cinemaRoomInfo.name,
            seats: seatsHelper.flatSeatsArray(cinemaRoomInfo.cinemaRoomSeats)
        })
    })
}

const sendRequestToEditCinemaRoom = (cinemaId, cinemaRoomInfo) =>{
    return fetch(`api/cinemas/${cinemaId}/cinemaRooms/${cinemaRoomInfo.cinemaRoomId}`, {
        method:'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        },
        body: JSON.stringify({
            name: cinemaRoomInfo.name,
            seats: seatsHelper.flatSeatsArray(cinemaRoomInfo.cinemaRoomSeats)
        })
    });
}

class CinemaDataAccess{

    getCinemaList = () =>{
        return sendRequestToGetCinemaList()
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequestedData);
    }

    getCinema = (id) =>{
        return sendRequestToGetCinema(id)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequestedData);
    }

    createCinema = (cinemaInfo) =>{
        return sendRequestToCreateCinema(cinemaInfo)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.getIdFromResponse)
    }

    editCinema = (cinemaInfo) =>{
        return sendRequestToEditCinema(cinemaInfo)
        .then(receivedDataProcessingHelper.handleRequestError);
    }

    getCinemaRoomList = (cinemaId) =>{
        return sendRequestToGetCinemaRoomList(cinemaId)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequestedData)
    }

    getCinemaRoomSeatTypes = (cinemaId, cinemaRoomId) =>{
        return sendRequestToGetCinemaRoomSeatTypes(cinemaId, cinemaRoomId)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequestedData);
    }

    getCinemaRoom = (cinemaid, cinemaRoomId) =>{
        return sendRequestToGetCinemaRoom(cinemaid, cinemaRoomId)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequestedData)
        .then(createRequestedCinemaRoomInfo);
    }

    createCinemaRoom = (cinemaId, cinemaRoomInfo) =>{
        return sendRequestToCreateCinemaRoom(cinemaId, cinemaRoomInfo)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(response =>
            {
                return {
                    name: cinemaRoomInfo.name,
                    cinemaRoomId: receivedDataProcessingHelper.getIdFromResponse(response)
                }
            }
        );
    }

    editCinemaRoom = (cinemaId, cinemaRoomInfo) =>{
        return sendRequestToEditCinemaRoom(cinemaId, cinemaRoomInfo)
        .then(receivedDataProcessingHelper.handleRequestError);
    }
}

const cinemaDataAccess = new CinemaDataAccess();

export default cinemaDataAccess;
