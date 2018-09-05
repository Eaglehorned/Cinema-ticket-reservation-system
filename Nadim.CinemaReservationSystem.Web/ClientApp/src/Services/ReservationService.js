import reservationDataAccess from "../DataAccess/ReservationDataAccess";

class ReservationServise{
    
    createOrder = (sessionId, chosenSessionSeats) =>{
        return reservationDataAccess.createOrder(sessionId, chosenSessionSeats);
    }

    countUpTotalPrice = (chosenSeats, sessionSeatTypePrices) =>{
        return chosenSeats.reduce((acc, current) => 
        acc + sessionSeatTypePrices.find((typePrice) =>
            typePrice.typeName === current.type
        ).price, 0);
    }
}

const reservationServise = new ReservationServise();

export default reservationServise;