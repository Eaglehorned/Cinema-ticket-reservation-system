import TokenService from "../Services/TokenService";
import ReceivedDataProcessingService from "../Services/ReceivedDataProcessingService";

export default class SessionDataAccess{
    static getSessionList = () =>{
        return SessionDataAccess.getSessionListFetch()
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.parseJson)
        .then(ReceivedDataProcessingService.getRequsetedData);
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
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.getIdFromResponse)
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
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.parseJson)
        .then(ReceivedDataProcessingService.getRequsetedData);
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
        .then(ReceivedDataProcessingService.handleRequstError);
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