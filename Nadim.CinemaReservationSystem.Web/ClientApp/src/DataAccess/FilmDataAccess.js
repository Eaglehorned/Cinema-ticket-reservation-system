import TokenService from '../Services/TokenService';
import ReceivedDataProcessingService from '../Services/ReceivedDataProcessingService';

export default class FilmDataAccess{
    static getFilmList = () =>{
        return FilmDataAccess.getFilmListFetch()
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.parseJson)
        .then(ReceivedDataProcessingService.getRequsetedData);
    }

    static getFilmListFetch = () =>{
        return fetch('api/films', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            }
        });
    }

    static getFilm = (id) =>{
        return FilmDataAccess.getFilmFetch(id)
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.parseJson)
        .then(ReceivedDataProcessingService.getRequsetedData);
    }

    static getFilmFetch = (id) =>{
        return fetch(`api/films/${id}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            }
        });
    }

    static createFilm = (filmInfo) =>{
        return FilmDataAccess.createFilmFetch(filmInfo)
        .then(ReceivedDataProcessingService.handleRequstError)
        .then(ReceivedDataProcessingService.getIdFromResponse);
    }

    static createFilmFetch = (filmInfo) =>{
        return fetch('api/films', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify(filmInfo)
        });
    }

    static editFilm = (filmId, filmInfo) =>{
        return FilmDataAccess.editFilmFetch(filmId, filmInfo)
        .then(ReceivedDataProcessingService.handleRequstError);
    }

    static editFilmFetch = (filmId, filmInfo) =>{
        return fetch(`api/films/${filmId}`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify(filmInfo)
        })
    }
}