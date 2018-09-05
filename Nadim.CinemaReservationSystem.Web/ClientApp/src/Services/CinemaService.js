import cinemaDataAccess from '../DataAccess/CinemaDataAccess';
import validationService from './ValidationService';

class CinemaService{

    getCinemaList = () =>{
        return cinemaDataAccess.getCinemaList();
    }

    getCinema = (id) =>{
        return cinemaDataAccess.getCinema(id);
    }

    createCinema = (cinemaInfo) =>{
        return cinemaDataAccess.createCinema(cinemaInfo);
    }

    editCinema = (cinemaInfo) =>{
        return cinemaDataAccess.editCinema(cinemaInfo);
    }

    getCinemaRoom = (cinemaId, cinemaRoomId) =>{
        return cinemaDataAccess.getCinemaRoom(cinemaId, cinemaRoomId);
    }

    createCinemaRoom = (cinemaId, cinemaRoomInfo) =>{
        return cinemaDataAccess.createCinemaRoom(cinemaId, cinemaRoomInfo);
    }

    editCinemaRoom = (cinemaId, cinemaRoomId, cinemaRoomInfo) =>{
        return cinemaDataAccess.editCinemaRoom(cinemaId, cinemaRoomId, cinemaRoomInfo);
    }

    getCinemaRoomList = (cinemaId) =>{
        return cinemaDataAccess.getCinemaRoomList(cinemaId);
    }

    getCinemaRoomSeatTypes = (cinemaId, cinemaRoomId) =>{
        return cinemaDataAccess.getCinemaRoomSeatTypes(cinemaId, cinemaRoomId);
    }

    validateCinemaRoomInfo(displayedComponents, rows, columns, name){
        if (displayedComponents.rows && !validationService.validateIntNumber(rows)){
            return false;
        }
        if (displayedComponents.columns && !validationService.validateIntNumber(columns)){
            return false;
        }
        if (displayedComponents.name && !validationService.validateString(name)){
            return false;
        }
        return true;
    }

    validateCinemaInfo(displayedComponents, city, name){
        if (displayedComponents.city && !validationService.validateString(city)){
            return false;
        }
        if (displayedComponents.name && !validationService.validateString(name)){
            return false;
        }
        return true;
    }

    updateCinemaList = (cinemaList, changedCinemaInfo) =>{
        const tempCinemaList = cinemaList;
        const tempChosenCinema = tempCinemaList.find((el) => el.cinemaId === changedCinemaInfo.cinemaId);
        tempChosenCinema.name = changedCinemaInfo.name;
        tempChosenCinema.city = changedCinemaInfo.city;
        return tempCinemaList;
    }

    updateCinemaRoomList = (cinemaRoomList, changedCinemaRoomId, changedCinemaRoomInfo) =>{
        const tempCinemaRooms = cinemaRoomList;
        tempCinemaRooms.find((el) => el.cinemaRoomId === changedCinemaRoomId).name = changedCinemaRoomInfo.name;
        return tempCinemaRooms;
    }
}

const cinemaService = new CinemaService();

export default cinemaService;