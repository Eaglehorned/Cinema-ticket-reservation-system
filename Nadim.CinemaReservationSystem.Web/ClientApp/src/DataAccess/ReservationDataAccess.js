import TokenService from "../Services/TokenService";
import ReceivedDataProcessingHelper from "../Helper/ReceivedDataProcessingHelper";

export default class ReservationDataAccess{
    static createOrder = (userId, sessionId, chosenSessionSeats) =>{
        return ReservationDataAccess.createOrderFetch(userId, sessionId, chosenSessionSeats)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.getIdFromResponse);
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