import SessionDataAccess from '../DataAccess/SessionDataAccess';
import ValidationService from './ValidationService';

export default class SessionService{
    static getSessionList = () =>{
        return SessionDataAccess.getSessionList();
    }

    static createSession = (sessionInfo) =>{
        return SessionDataAccess.createSession(sessionInfo);
    }

    static getSession = (id) =>{
        return SessionDataAccess.getSession(id);
    }

    static editSession = (id, sessionInfo) =>{
        return SessionDataAccess.editSession(id, sessionInfo);
    }

    static getSessionSeats = (sessionId) =>{
        return SessionDataAccess.getSessionSeats(sessionId);
    }

    static updateSessionList = (sessionList, changedSessionId, changedSessionInfo) =>{
        const tempSessionList = sessionList;
        const tempSessionChangedElement = tempSessionList.find( el => el.sessionId === changedSessionId);
        tempSessionChangedElement.cinema = changedSessionInfo.cinema;
        tempSessionChangedElement.cinemaRoom = changedSessionInfo.cinemaRoom;
        tempSessionChangedElement.film = changedSessionInfo.film;
        tempSessionChangedElement.beginTime = changedSessionInfo.beginTime;
        return tempSessionList;
    }

    static updateSeatTypesList = (seatTypes, seatTypeInfo) =>{
        let tempSeatTypes = seatTypes;
        tempSeatTypes.find((el) => el.seatTypeId === seatTypeInfo.seatTypeId).price = seatTypeInfo.price;
        return tempSeatTypes;
    }

    static completeSessionWithSeats = (session, seats) =>{
        session.seats = seats;
        return session;
    }

    static completeSessionWithInfo = (session, info) =>{
        session.info = info;
        return session;
    }

    static validateSessionInfo = (
        chosenCinema, 
        chosenCinemaRoom, 
        chosenFilm, 
        beginTime, 
        seatTypePrices
    ) =>{
        if (chosenCinema
            && chosenCinemaRoom
            && chosenFilm
            && beginTime
            && ValidationService.validateSeatTypePricesList(seatTypePrices)
            && ValidationService.validateFutureDate(beginTime)
        ){
            return true;
        }
        return false;
    }
}