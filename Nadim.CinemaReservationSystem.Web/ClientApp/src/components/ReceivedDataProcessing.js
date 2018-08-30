export default class ReceivedDataProcessing{
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
        return response.headers.get('location').substring(response.headers.get('location').lastIndexOf('/') + 1, response.headers.get('location').length);
    }
}