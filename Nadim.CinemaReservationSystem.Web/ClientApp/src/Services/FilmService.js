import FilmDataAccess from "../DataAccess/FilmDataAccess";

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
}