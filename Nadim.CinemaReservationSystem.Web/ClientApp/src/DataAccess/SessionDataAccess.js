import TokenService from "../Services/TokenService";
import ReceivedDataProcessingHelper from "../Helper/ReceivedDataProcessingHelper";
import moment from 'moment';
import SeatsHelper from "../Helper/SeatsHelper";

export default class SessionDataAccess{
    static getSessionList = () =>{
        return SessionDataAccess.getSessionListFetch()
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.parseJson)
        .then(ReceivedDataProcessingHelper.getRequsetedData);
    }

    static getSessionListFetch = () =>{
        return fetch('api/sessions', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            }
        });
    }

    static createSession = (sessionInfo) =>{
        return SessionDataAccess.formSessionInfoForRequest(sessionInfo)
        .then(SessionDataAccess.createSessionFetch)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.getIdFromResponse)
        .then(id => SessionDataAccess.completeSessionInfoWithId(sessionInfo, id))
    }

    static createSessionFetch = (sessionInfo) =>{
        return fetch('api/sessions', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify(sessionInfo)
        })
    }

    static getSession = (id) =>{
        return SessionDataAccess.getSessionFetch(id)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.parseJson)
        .then(ReceivedDataProcessingHelper.getRequsetedData);
    }

    static getSessionFetch = (id) =>{
        return fetch(`api/sessions/${id}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            }
        });
    }

    static editSession = (id, sessionInfo) =>{
        return SessionDataAccess.formSessionInfoForRequest(sessionInfo) 
        .then(sessionInfoForRequest => SessionDataAccess.editSessionFetch(id, sessionInfoForRequest))
        .then(ReceivedDataProcessingHelper.handleRequstError);
    }

    static editSessionFetch = (id, sessionInfo) =>{
        return fetch(`api/sessions/${id}`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify(sessionInfo)
        });
    }

    static getSessionSeats = (sessionId) =>{
        return SessionDataAccess.getSessionSeatsFetch(sessionId)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.parseJson)
        .then(ReceivedDataProcessingHelper.getRequsetedData)
        .then(SeatsHelper.sortSeats)
        .then((seats) => SeatsHelper.convertSeatsArray(
            seats,
            SeatsHelper.getSeatsRowsNumber(seats),
            SeatsHelper.getSeatsColumnsNumber(seats)
        ));
    }

    static getSessionSeatsFetch = (sessionId) =>{
        return fetch(`api/sessions/${sessionId}/seats`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            }
        });
    }

    static getSessionSeatsUpdates = (sessionId, lastTimeUpdated) =>{
        return SessionDataAccess.getSessionSeatsUpdatesFetch(sessionId, lastTimeUpdated)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.parseJson)
        .then(ReceivedDataProcessingHelper.getRequsetedData);
    }

    static getSessionSeatsUpdatesFetch = (sessionId, lastTimeUpdated) =>{
        return fetch(`api/sessions/${sessionId}/seats`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`,
                'If-Modified-Since': lastTimeUpdated.toUTCString()
            }
        });
    }

    static editSessionSeat = (sessionId, sessionSeatId, booked) =>{
        return SessionDataAccess.editSessionSeatFetch(sessionId, sessionSeatId, booked)
        .then(ReceivedDataProcessingHelper.handleRequstError);
    }

    static editSessionSeatFetch = (sessionId, sessionSeatId, booked) =>{
        return fetch(`api/sessions/${sessionId}/seats/${sessionSeatId}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify({
                booked: booked,
                lastTimeUpdated: moment().format()
            })
        });
    }

    static formSessionInfoForRequest = (sessionInfo) =>{
        return new Promise ((resolve) => {
            resolve({
                cinemaRoomId: sessionInfo.cinemaRoom.cinemaRoomId,
                filmId: sessionInfo.film.filmId,
                beginTime: sessionInfo.beginTime,
                sessionSeatTypePrices: sessionInfo.sessionSeatTypePrices
            });}
        );
    }

    static completeSessionInfoWithId = (sessionInfo, id) =>{
        sessionInfo.sessionId = id;
        return sessionInfo;
    }
}