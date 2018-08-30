import FilmDataAccess from "../DataAccess/FilmDataAccess";
import moment from 'moment';
import ValidationService from "./ValidationService";

export default class FilmService{
    static getFilmList = () =>{
        return FilmDataAccess.getFilmList();
    }

    static getFilm = (id) =>{
        return FilmDataAccess.getFilm(id);
    }

    static createFilm = (filmInfo) =>{
        return FilmDataAccess.createFilm(filmInfo);
    }

    static editFilm = (filmId, filmInfo) =>{
        return FilmDataAccess.editFilm(filmId, filmInfo);
    }

    static durationFromSecToDate = (duration) =>{
        let temp = moment({
            hours: Math.trunc(duration / 3600),
            minutes: Math.trunc((duration % 3600) / 60),
            seconds: (duration % 3600) % 60
        });
        return temp;
    }

    static durationFromDateToSec = (duration) =>{
        return duration.hours() * 3600 
        + duration.minutes() * 60
        + duration.seconds();
    }

    static formDate = (date) =>{
        return new Date( 
            Date.UTC(
                date.year(), 
                date.month(),
                date.date()
            )
        );
    }

    static validateFilmInfo = (name, description, startDate, endDate, duration) =>{
        return ValidationService.validateString(name)
        && ValidationService.validateString(description)
        && ValidationService.validateStartAndEndDates(startDate, endDate)
        && ValidationService.validateDuration(duration);
    }
}