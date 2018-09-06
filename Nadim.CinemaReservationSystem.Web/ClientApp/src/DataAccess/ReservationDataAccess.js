import receivedDataProcessingHelper from "../Helper/ReceivedDataProcessingHelper";
import userService from "../Services/UserService";

const sendRequestToCreateOrder = (sessionId, chosenSessionSeats) =>{
    return fetch('api/orders/', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        },
        body: JSON.stringify({
            userId: userService.getUserId(),
            sessionId: sessionId,
            sessionSeats: chosenSessionSeats.map(el => el.sessionSeatId)
        })
    });
}

class ReservationDataAccess{
    createOrder = (sessionId, chosenSessionSeats) =>{
        return sendRequestToCreateOrder(sessionId, chosenSessionSeats)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.getIdFromResponse);
    }
}

const reservationDataAccess = new ReservationDataAccess();

export default reservationDataAccess;