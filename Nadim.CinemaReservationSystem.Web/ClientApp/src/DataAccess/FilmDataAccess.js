import authorizationService from '../Services/AuthorizationService';
import ReceivedDataProcessingHelper from '../Helper/ReceivedDataProcessingHelper';

export default class FilmDataAccess{
    static getFilmList = () =>{
        return FilmDataAccess.getFilmListFetch()
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.parseJson)
        .then(ReceivedDataProcessingHelper.getRequsetedData);
    }

    static getFilmListFetch = () =>{
        return fetch('api/films', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            }
        });
    }

    static getFilm = (id) =>{
        return FilmDataAccess.getFilmFetch(id)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.parseJson)
        .then(ReceivedDataProcessingHelper.getRequsetedData)
        .then((filmInfo) => FilmDataAccess.completeFilmInfoWithId(id, filmInfo));
    }

    static getFilmFetch = (id) =>{
        return fetch(`api/films/${id}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            }
        });
    }

    static createFilm = (filmInfo) =>{
        return FilmDataAccess.createFilmFetch(filmInfo)
        .then(ReceivedDataProcessingHelper.handleRequstError)
        .then(ReceivedDataProcessingHelper.getIdFromResponse);
    }

    static createFilmFetch = (filmInfo) =>{
        return fetch('api/films', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            },
            body: JSON.stringify(filmInfo)
        });
    }

    static editFilm = (filmId, filmInfo) =>{
        return FilmDataAccess.editFilmFetch(filmId, filmInfo)
        .then(ReceivedDataProcessingHelper.handleRequstError);
    }

    static editFilmFetch = (filmId, filmInfo) =>{
        return fetch(`api/films/${filmId}`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authorizationService.getToken()}`
            },
            body: JSON.stringify(filmInfo)
        })
    }

    static completeFilmInfoWithId(filmId, filmInfo){
        filmInfo.filmId = filmId;
        return filmInfo;
    }
}