import authorizationService from "../Services/AuthorizationService";
import ReceivedDataProcessingHelper from "../Helper/ReceivedDataProcessingHelper";

export default class ReservationDataAccess{
    static createOrder = (sessionId, chosenSessionSeats) =>{
        return ReservationDataAccess.createOrderFetch(sessionId, chosenSessionSeats)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.getIdFromResponse);
    }

    static createOrderFetch = (sessionId, chosenSessionSeats) =>{
        return fetch('api/orders/', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            },
            body: JSON.stringify({
                userId: authorizationService.getUserId(),
                sessionId: sessionId,
                sessionSeats: chosenSessionSeats.map(el => el.sessionSeatId)
            })
        });
    }
}