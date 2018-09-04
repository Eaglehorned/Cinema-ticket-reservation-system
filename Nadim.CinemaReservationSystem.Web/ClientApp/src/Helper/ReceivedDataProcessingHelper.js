export default class ReceivedDataProcessingHelper{
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

    static getIdFromResponse = (response) =>{
        return parseInt(response.headers.get('location').substring(response.headers.get('location').lastIndexOf('/') + 1, response.headers.get('location').length), 10);
    }

    static convertSeatsArray(seats, rows, columns){
        let seatsArray = [];
        for (let i = 0; i < rows; i++){
            seatsArray[i] = [];
            for (let j = 0; j < columns; j++) {
                seatsArray[i].push(seats[i * columns + j]);
            }
        }
        return seatsArray;
    }

    static sortSeats = (seats) =>{
            return seats.sort((a, b) => {
            if (a.row === b.row){
                if (a.column > b.column){
                    return 1;
                }
                if (a.column < b.column){
                    return -1;
                } 
                return 0;
            }
            if (a.row > b.row){
                return 1;
            }
            return -1;
        });
    }

    static getSeatsRowsNumber = (seats) =>{
        return seats[seats.length - 1].row + 1;
    }

    static getSeatsColumnsNumber = (seats) =>{
        return seats[seats.length - 1].column + 1;
    }
}