import authorizationService from "../Services/AuthorizationService";
import receivedDataProcessingHelper from "../Helper/ReceivedDataProcessingHelper";
import moment from 'moment';
import seatsHelper from "../Helper/SeatsHelper";

const getSessionListFetch = () =>{
    return fetch('api/sessions', {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const formSessionInfoForRequest = (sessionInfo) =>{
    return new Promise ((resolve) => {
        resolve({
            cinemaRoomId: sessionInfo.cinemaRoom.cinemaRoomId,
            filmId: sessionInfo.film.filmId,
            beginTime: sessionInfo.beginTime,
            sessionSeatTypePrices: sessionInfo.sessionSeatTypePrices
        });}
    );
}

const createSessionFetch = (sessionInfo) =>{
    return fetch('api/sessions', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        },
        body: JSON.stringify(sessionInfo)
    })
}

const completeSessionInfoWithId = (sessionInfo, id) =>{
    sessionInfo.sessionId = id;
    return sessionInfo;
}

const getSessionFetch = (id) =>{
    return fetch(`api/sessions/${id}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const editSessionFetch = (id, sessionInfo) =>{
    return fetch(`api/sessions/${id}`, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        },
        body: JSON.stringify(sessionInfo)
    });
}

const getSessionSeatsFetch = (sessionId) =>{
    return fetch(`api/sessions/${sessionId}/seats`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const getSessionSeatsUpdatesFetch = (sessionId, lastTimeUpdated) =>{
    return fetch(`api/sessions/${sessionId}/seats`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`,
            'If-Modified-Since': lastTimeUpdated.toUTCString()
        }
    });
}

const editSessionSeatFetch = (sessionId, sessionSeatId, booked) =>{
    return fetch(`api/sessions/${sessionId}/seats/${sessionSeatId}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        },
        body: JSON.stringify({
            booked: booked,
            lastTimeUpdated: moment().format()
        })
    });
}

class SessionDataAccess{
    getSessionList = () =>{
        return getSessionListFetch()
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequsetedData);
    }

    createSession = (sessionInfo) =>{
        return formSessionInfoForRequest(sessionInfo)
        .then(createSessionFetch)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.getIdFromResponse)
        .then(id => completeSessionInfoWithId(sessionInfo, id))
    }

    getSession = (id) =>{
        return getSessionFetch(id)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequsetedData);
    }

    editSession = (id, sessionInfo) =>{
        return formSessionInfoForRequest(sessionInfo) 
        .then(sessionInfoForRequest => editSessionFetch(id, sessionInfoForRequest))
        .then(receivedDataProcessingHelper.handleRequstError);
    }

    getSessionSeats = (sessionId) =>{
        return getSessionSeatsFetch(sessionId)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequsetedData)
        .then(seatsHelper.sortSeats)
        .then((seats) => seatsHelper.convertSeatsArray(
            seats,
            seatsHelper.getSeatsRowsNumber(seats),
            seatsHelper.getSeatsColumnsNumber(seats)
        ));
    }

    getSessionSeatsUpdates = (sessionId, lastTimeUpdated) =>{
        return getSessionSeatsUpdatesFetch(sessionId, lastTimeUpdated)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequsetedData);
    }

    editSessionSeat = (sessionId, sessionSeatId, booked) =>{
        return editSessionSeatFetch(sessionId, sessionSeatId, booked)
        .then(receivedDataProcessingHelper.handleRequstError);
    }
}

const sessionDataAccess = new SessionDataAccess();

export default sessionDataAccess;