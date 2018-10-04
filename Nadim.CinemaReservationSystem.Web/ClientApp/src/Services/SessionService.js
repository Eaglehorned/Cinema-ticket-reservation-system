import sessionDataAccess from '../DataAccess/SessionDataAccess';
import validationService from './ValidationService';
import moment from 'moment';

class SessionService{
    getSessionList = () =>{
        return sessionDataAccess.getSessionList();
    }

    getSessionListWithFilters = (filterString) =>{
        return sessionDataAccess.getSessionListWithFilters(filterString);
    }

    createSession = (sessionInfo) =>{
        return sessionDataAccess.createSession(sessionInfo);
    }

    getSession = (id) =>{
        return sessionDataAccess.getSession(id);
    }

    editSession = (sessionInfo) =>{
        return sessionDataAccess.editSession(sessionInfo);
    }

    getSessionSeats = (sessionId) =>{
        return sessionDataAccess.getSessionSeats(sessionId);
    }

    getSessionSeatsUpdates = (sessionId, lastTimeUpdated) =>{
        return sessionDataAccess.getSessionSeatsUpdates(sessionId, lastTimeUpdated);
    }

    editSessionSeat = (sessionId, sessionSeatId, booked) =>{
        return sessionDataAccess.editSessionSeat(sessionId, sessionSeatId, booked);
    }

    updateSessionList = (sessionList, changedSessionInfo) =>{
        const tempSessionList = sessionList;
        const tempSessionChangedElement = tempSessionList.find( el => el.sessionId === changedSessionInfo.sessionId);
        tempSessionChangedElement.cinema = changedSessionInfo.cinema;
        tempSessionChangedElement.cinemaRoom = changedSessionInfo.cinemaRoom;
        tempSessionChangedElement.film = changedSessionInfo.film;
        tempSessionChangedElement.beginTime = changedSessionInfo.beginTime;
        return tempSessionList;
    }

    updateSeatTypesList = (seatTypes, seatTypeInfo) =>{
        let tempSeatTypes = seatTypes;
        tempSeatTypes.find((el) => el.seatTypeId === seatTypeInfo.seatTypeId).price = seatTypeInfo.price;
        return tempSeatTypes;
    }

    addSeatsToSession = (session, seats) =>{
        session.seats = seats;
        return session;
    }

    addInfoToSession = (session, info) =>{
        session.info = info;
        return session;
    }

    updateSessionSeatInSeatsArray = (seatInfo, seats) =>{
        seats[seatInfo.row][seatInfo.column].chosen = seatInfo.booked;
        return seats;
    }

    updateSessionSeatInChosenSeatsArray = (seatInfo, chosenSeats) =>{
        if(!seatInfo.booked){
            chosenSeats.splice(chosenSeats.findIndex( el => el.sessionSeatId === seatInfo.sessionSeatId), 1);
        }
        else{
            chosenSeats = chosenSeats.concat(seatInfo);
        }
        return chosenSeats ;
    }

    formSeatInfo = (seatInfo) =>{
       const tempSeatInfo = Object.assign({}, seatInfo);
       tempSeatInfo.booked = !seatInfo.chosen;
       return tempSeatInfo; 
    }

    updateSessionSeats = (seats, chosenSeats, updates) =>{
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

    updateChosenSessionSeats = (chosenSeats, updates) =>{
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

    sortSessionByTime = (sessions) =>{
        return sessions.sort((a, b)=>{
            if (moment(a.beginTime) > moment(b.beginTime)){
                return 1;
            }
            if(moment(a.beginTime) < moment(b.beginTime)){
                return -1;
            }
            return 0;
        });
    }

    filterSessionsByDate = (sessions, startDate, endDate) =>{
        let filteredSessions = sessions;
        if(startDate){
            filteredSessions = filteredSessions.filter(el => startDate.isSameOrBefore(moment(el.beginTime)));
        }
        if(endDate){
            filteredSessions = filteredSessions.filter(el => endDate.isSameOrAfter(moment(el.beginTime)));
        }
        return filteredSessions;
    } 

    validateSessionInfo = (
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
            && validationService.validateSeatTypePricesList(seatTypePrices)
            && validationService.validateFutureDate(beginTime)
        ){
            return true;
        }
        return false;
    }
}

const sessionService = new SessionService();

export default sessionService;