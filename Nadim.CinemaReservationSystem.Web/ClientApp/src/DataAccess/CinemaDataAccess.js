import TokenService from '../Services/TokenService';

export default class CinemaDataAccess{

    static getCinemaList = () =>{
        return CinemaDataAccess.getCinemaListFetch()
        .then(CinemaDataAccess.handleRequstError)
        .then(CinemaDataAccess.parseJson)
        .then(CinemaDataAccess.getRequsetedData);
    }

    static getCinemaListFetch = () =>{
        return fetch('api/cinemas', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    static getCinema = (id) =>{
        return CinemaDataAccess.getCinemaFetch(id)
        .then(CinemaDataAccess.handleRequstError)
        .then(CinemaDataAccess.parseJson)
        .then(CinemaDataAccess.getRequsetedData)
        .then(requestedData => CinemaDataAccess.CompeleteCinemaInfoWithId(requestedData, id))
    }

    static getCinemaFetch = (id) =>{
        return fetch(`api/cinemas/${id}`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            }
        });
    }

    static createCinema = (cinemaInfo) =>{
        return CinemaDataAccess.createCinemaFetch(cinemaInfo)
        .then(CinemaDataAccess.handleRequstError)
        .then((response) => CinemaDataAccess.formFullCinemaRoom(cinemaInfo, CinemaDataAccess.getIdFromResponse(response)))
    }

    static createCinemaFetch = (cinemaInfo) =>{
        return fetch('api/cinemas', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify(cinemaInfo)
        })
    }

    static completeCinemaInfoWithCinemaRooms = (cinemaInfo) =>{
        cinemaInfo.cinemaRooms = [];
        return cinemaInfo;
    }

    static formFullCinemaRoom = (cinemaInfo, id) =>{
        let tempCinema = {};
        tempCinema.info = cinemaInfo;
        CinemaDataAccess.CompeleteCinemaInfoWithId(tempCinema, id);
        tempCinema.cinemaRooms = [];
        return tempCinema;
    }

    static getIdFromResponse = (response) =>{
        return response.headers.get('location').substring(response.headers.get('location').lastIndexOf('/') + 1, response.headers.get('location').length);
    }

    static CompeleteCinemaInfoWithId = (requestedData, id) =>{
        requestedData.info.cinemaId = id;
        return requestedData;
    }

    static getRequsetedData = (parsedJson) =>{
        return (parsedJson.requestedData);
    }

    static parseJson = (response) =>{
        return response.json();
    }

    static handleRequstError = (response) =>{
        if (response.ok){
            return response;
        }
        if (response.status === 400){
            return response.json().then((err) => {
                throw new Error(`Bad request. ${err.details}`);
            });
        }
        if (response.status === 401){
            throw new Error('You need to authorize to do that action.');
        }
        if (response.status === 404){
            return response.json().then((err) => {
                throw new Error(`Not found. ${err.details}`);
            });
        }
        if (response.status === 500){
            return response.json().then((err) => {
                throw new Error(err.details);
            });
        }
    }
}