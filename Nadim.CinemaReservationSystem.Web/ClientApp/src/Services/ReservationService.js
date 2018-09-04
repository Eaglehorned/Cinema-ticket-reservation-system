import ReservationDataAccess from "../DataAccess/ReservationDataAccess";

export default class ReservationServise{
    
    static createOrder = (sessionId, chosenSessionSeats) =>{
        return ReservationDataAccess.createOrder(sessionId, chosenSessionSeats);
    }

    static countUpTotalPrice = (chosenSeats, sessionSeatTypePrices) =>{
        return chosenSeats.reduce((acc, current) => 
        acc + sessionSeatTypePrices.find((typePrice) =>
            typePrice.typeName === current.type
        ).price, 0);
    }
}