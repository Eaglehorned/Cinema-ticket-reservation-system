import authorizationService from '../Services/AuthorizationService';
import receivedDataProcessingHelper from '../Helper/ReceivedDataProcessingHelper';

const getFilmListFetch = () =>{
    return fetch('api/films', {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const getFilmFetch = (id) =>{
    return fetch(`api/films/${id}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const completeFilmInfoWithId = (filmId, filmInfo) =>{
    filmInfo.filmId = filmId;
    return filmInfo;
}

const createFilmFetch = (filmInfo) =>{
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

const editFilmFetch = (filmId, filmInfo) =>{
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

class FilmDataAccess{
    getFilmList = () =>{
        return getFilmListFetch()
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequsetedData);
    }

    getFilm = (id) =>{
        return getFilmFetch(id)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequsetedData)
        .then((filmInfo) => completeFilmInfoWithId(id, filmInfo));
    }

    createFilm = (filmInfo) =>{
        return createFilmFetch(filmInfo)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.getIdFromResponse);
    }

    editFilm = (filmId, filmInfo) =>{
        return editFilmFetch(filmId, filmInfo)
        .then(receivedDataProcessingHelper.handleRequstError);
    }
}

const filmDataAccess = new FilmDataAccess();

export default filmDataAccess;