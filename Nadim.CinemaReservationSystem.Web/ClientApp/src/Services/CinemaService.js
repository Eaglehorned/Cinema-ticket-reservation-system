import CinemaDataAccess from '../DataAccess/CinemaDataAccess'

export default class CinemaService{

    static getCinemaList = () =>{
        return CinemaDataAccess.getCinemaList();
    }

    static getCinema = (id) =>{
        return CinemaDataAccess.getCinema(id);
    }

    static createCinema = (cinemaInfo) =>{
        return CinemaDataAccess.createCinema(cinemaInfo);
    }
}