import authorizationService from "../Services/AuthorizationService";
import receivedDataProcessingHelper from "../Helper/ReceivedDataProcessingHelper";
import moment from 'moment';
import seatsHelper from "../Helper/SeatsHelper";

const sendRequestToGetSessionList = () =>{
    return fetch('api/sessions', {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const createSessionInfoForRequest = (sessionInfo) =>{
    return new Promise ((resolve) => {
        resolve({
            cinemaRoomId: sessionInfo.cinemaRoom.cinemaRoomId,
            filmId: sessionInfo.film.filmId,
            beginTime: sessionInfo.beginTime,
            sessionSeatTypePrices: sessionInfo.sessionSeatTypePrices
        });}
    );
}

const sendRequestToCreateSession = (sessionInfo) =>{
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

const addIdToSessionInfo = (sessionInfo, id) =>{
    sessionInfo.sessionId = id;
    return sessionInfo;
}

const sendRequestToGetSession = (id) =>{
    return fetch(`api/sessions/${id}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const sendRequestToEditSession = (id, sessionInfo) =>{
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

const sendRequestToGetSessionSeats = (sessionId) =>{
    return fetch(`api/sessions/${sessionId}/seats`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const sendRequestToGetSessionSeatsUpdates = (sessionId, lastTimeUpdated) =>{
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

const sendRequestToEditSessionSeat = (sessionId, sessionSeatId, booked) =>{
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
        return sendRequestToGetSessionList()
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequestedData);
    }

    createSession = (sessionInfo) =>{
        return createSessionInfoForRequest(sessionInfo)
        .then(sendRequestToCreateSession)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.getIdFromResponse)
        .then(id => addIdToSessionInfo(sessionInfo, id))
    }

    getSession = (id) =>{
        return sendRequestToGetSession(id)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequestedData);
    }

    editSession = (id, sessionInfo) =>{
        return createSessionInfoForRequest(sessionInfo) 
        .then(sessionInfoForRequest => sendRequestToEditSession(id, sessionInfoForRequest))
        .then(receivedDataProcessingHelper.handleRequestError);
    }

    getSessionSeats = (sessionId) =>{
        return sendRequestToGetSessionSeats(sessionId)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequestedData)
        .then(seatsHelper.sortSeats)
        .then((seats) => seatsHelper.convertSeatsArray(
            seats,
            seatsHelper.getSeatsRowsNumber(seats),
            seatsHelper.getSeatsColumnsNumber(seats)
        ));
    }

    getSessionSeatsUpdates = (sessionId, lastTimeUpdated) =>{
        return sendRequestToGetSessionSeatsUpdates(sessionId, lastTimeUpdated)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequestedData);
    }

    editSessionSeat = (sessionId, sessionSeatId, booked) =>{
        return sendRequestToEditSessionSeat(sessionId, sessionSeatId, booked)
        .then(receivedDataProcessingHelper.handleRequestError);
    }
}

const sessionDataAccess = new SessionDataAccess();

export default sessionDataAccess;