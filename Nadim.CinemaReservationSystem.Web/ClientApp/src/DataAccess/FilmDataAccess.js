import receivedDataProcessingHelper from '../Helper/ReceivedDataProcessingHelper';
import userService from '../Services/UserService';

const sendRequestToGetFilmList = () =>{
    return fetch('api/films', {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        }
    });
}

const sendRequestToGetFilm = (id) =>{
    return fetch(`api/films/${id}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        }
    });
}

const sendRequestToCreateFilm = (filmInfo) =>{
    return fetch('api/films', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        },
        body: JSON.stringify(filmInfo)
    });
}

const sendRequestToEditFilm = (filmInfo) =>{
    return fetch(`api/films/${filmInfo.filmId}`, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        },
        body: JSON.stringify(filmInfo)
    })
}

const sendRequestToGetFilmSessionsList = (filmId, searchString) =>{
    return fetch(`api/films/${filmId}/sessions${searchString}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${userService.getToken()}`
        }
    });
}

class FilmDataAccess{
    getFilmList = () =>{
        return sendRequestToGetFilmList()
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(receivedDataProcessingHelper.getRequestedData);
    }

    getFilmSessionsList = (filmId, searchString) =>{
        return sendRequestToGetFilmSessionsList(filmId, searchString)
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


    editFilm = (filmInfo) =>{
        return sendRequestToEditFilm(filmInfo)
        .then(receivedDataProcessingHelper.handleRequestError);
    }
}

const filmDataAccess = new FilmDataAccess();

export default filmDataAccess;
