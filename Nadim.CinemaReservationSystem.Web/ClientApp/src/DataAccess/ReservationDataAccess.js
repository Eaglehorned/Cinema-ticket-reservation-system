import authorizationService from "../Services/AuthorizationService";
import receivedDataProcessingHelper from "../Helper/ReceivedDataProcessingHelper";

const createOrderFetch = (sessionId, chosenSessionSeats) =>{
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

class ReservationDataAccess{
    createOrder = (sessionId, chosenSessionSeats) =>{
        return createOrderFetch(sessionId, chosenSessionSeats)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.getIdFromResponse);
    }
}

const reservationDataAccess = new ReservationDataAccess();

export default reservationDataAccess;