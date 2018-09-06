import authorizationService from '../Services/AuthorizationService';
import receivedDataProcessingHelper from '../Helper/ReceivedDataProcessingHelper';

const sendRequestToGetFilmList = () =>{
    return fetch('api/films', {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const sendRequestToGetFilm = (id) =>{
    return fetch(`api/films/${id}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authorizationService.getToken()}`
        }
    });
}

const sendRequestToCreateFilm = (filmInfo) =>{
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

const sendRequestToEditFilm = (filmId, filmInfo) =>{
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
        return sendRequestToGetFilmList()
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequestedData);
    }

    getFilm = (id) =>{
        return sendRequestToGetFilm(id)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequestedData);
    }

    createFilm = (filmInfo) =>{
        return sendRequestToCreateFilm(filmInfo)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.getIdFromResponse);
    }


    editFilm = (filmId, filmInfo) =>{
        return sendRequestToEditFilm(filmId, filmInfo)
        .then(receivedDataProcessingHelper.handleRequestError);
    }
}

const filmDataAccess = new FilmDataAccess();

export default filmDataAccess;
