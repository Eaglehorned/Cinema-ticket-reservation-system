import TokenService from "../Services/TokenService";
import ReceivedDataProcessingService from "../Services/ReceivedDataProcessingService";

export default class ReservationDataAccess{
    static createOrder = (userId, sessionId, chosenSessionSeats) =>{
        return ReservationDataAccess.createOrderFetch(userId, sessionId, chosenSessionSeats)
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.getIdFromResponse);
    }

    static createOrderFetch = (userId, sessionId, chosenSessionSeats) =>{
        return fetch('api/orders/', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify({
                userId: userId,
                sessionId: sessionId,
                sessionSeats: chosenSessionSeats.map(el => el.sessionSeatId)
            })
        });
    }
}