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

    static getSessionSeatsUpdates = (sessionId, lastTimeUpdated) =>{
        return SessionDataAccess.getSessionSeatsUpdates(sessionId, lastTimeUpdated);
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

    static updateSessionSeats = (seats, chosenSeats, updates) =>{
        const updatesNotChosenHere = updates.filter(el =>{
            return !chosenSeats.find(ch => ch.sessionSeatId === el.sessionSeatId);
        })

        updatesNotChosenHere.forEach(el => {
            seats[el.row][el.column].booked = el.booked;
        });

        const updatesChosenHere = updates.filter(el =>{
            return chosenSeats.find(ch => ch.sessionSeatId === el.sessionSeatId);
        });

        updatesChosenHere.forEach(el =>{
            if (el.booked === false){
                seats[el.row][el.column].chosen = false;
            }
        });

        return seats;
    }

    static updateChosenSessionSeats = (chosenSeats, updates) =>{
        const updatesChosenHere = updates.filter(el =>{
            return chosenSeats.find(ch => ch.sessionSeatId === el.sessionSeatId);
        })

        updatesChosenHere.forEach(el =>{
            if (el.booked === false){
                chosenSeats = chosenSeats.splice(chosenSeats.findIndex(ch => ch.sessionSeatId === el.sessionSeatId), 1);
            }
        });

        return chosenSeats;
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