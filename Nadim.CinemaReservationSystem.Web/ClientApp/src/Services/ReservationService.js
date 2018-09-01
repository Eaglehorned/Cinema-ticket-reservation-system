import ReservationDataAccess from "../DataAccess/ReservationDataAccess";

export default class ReservationServise{
    
    static createOrder = (userId, sessionId, chosenSessionSeats) =>{
        return ReservationDataAccess.createOrder(userId, sessionId, chosenSessionSeats);
    }

    static countUpTotalPrice = (chosenSeats, sessionSeatTypePrices) =>{
        return chosenSeats.reduce((acc, current) => 
        acc + sessionSeatTypePrices.find((typePrice) =>
            typePrice.typeName === current.type
        ).price, 0);
    }
}