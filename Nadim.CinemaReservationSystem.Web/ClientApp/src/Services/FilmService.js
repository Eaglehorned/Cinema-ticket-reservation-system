import filmDataAccess from "../DataAccess/FilmDataAccess";
import moment from 'moment';
import validationService from "./ValidationService";

class FilmService{
    getFilmList = () =>{
        return filmDataAccess.getFilmList();
    }

    getFilm = (id) =>{
        return filmDataAccess.getFilm(id);
    }

    createFilm = (filmInfo) =>{
        return filmDataAccess.createFilm(filmInfo);
    }

    editFilm = (filmId, filmInfo) =>{
        return filmDataAccess.editFilm(filmId, filmInfo);
    }

    durationFromSecToDate = (duration) =>{
        let temp = moment({
            hours: Math.trunc(duration / 3600),
            minutes: Math.trunc((duration % 3600) / 60),
            seconds: (duration % 3600) % 60
        });
        return temp;
    }

    durationFromDateToSec = (duration) =>{
        return duration.hours() * 3600 
        + duration.minutes() * 60
        + duration.seconds();
    }

    formDate = (date) =>{
        return new Date( 
            Date.UTC(
                date.year(), 
                date.month(),
                date.date()
            )
        );
    }

    validateFilmInfo = (name, description, startDate, endDate, duration) =>{
        return validationService.validateString(name)
        && validationService.validateString(description)
        && validationService.validateStartAndEndDates(startDate, endDate)
        && validationService.validateDuration(duration);
    }

    updateFilmList = (filmList, changedFilmId, changedFilmInfo) =>{
        let tempFilmList = filmList;
        tempFilmList.find((el) => el.filmId === changedFilmId).name = changedFilmInfo.name;
        return tempFilmList;
    }
}

const filmService = new FilmService();

export default filmService;