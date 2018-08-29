import React, { Component } from 'react';
import FormFilm from './FormFilm';
import { Button } from 'react-bootstrap';
import FilmDisplayInfoBox from './FilmDisplayInfoBox';
import ApplicationService from '../../Services/ApplicationService';

export default class Film extends Component{
    displayName = Film.displayName;
    
    constructor(props){
        super(props);
        this.state={
            filmList:[],
            chosenOperation: '',
            chosenFilmInfo: undefined
        }

        this.cancelCurrentOperation = this.cancelCurrentOperation.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.renderActionsContent = this.renderActionsContent.bind(this);
        this.createFilm = this.createFilm.bind(this);
        this.getFilmList = this.getFilmList.bind(this);
        this.getFilm = this.getFilm.bind(this);
        this.editFilm = this.editFilm.bind(this);

        this.getFilmList();
    }

    cancelCurrentOperation(){
        this.setState({
            chosenOperation: ''
        });
    }

    getFilmList(){
        fetch('api/films', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
        }).then(response => {
                if (response.ok){
                    return response.json();
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
            }).then(parsedJson => {
                    this.setState({
                        filmList: parsedJson.requestedData,
                    });
                })
                .catch(error => ApplicationService.informWithMessage(
                    { 
                        text: error.message,
                        isError: true
                    })
                );
    }

    getFilm(filmId){
        this.setState({
            chosenOperation: 'editFilmLoading'
        });
        fetch(`api/films/${filmId}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
        })
        .then(response => {
            if (response.ok){
                return response.json();
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
        })
        .then(parsedJson => {
            let tempParsedJson = parsedJson.requestedData;
            tempParsedJson.filmId = filmId;
            this.setState({
                chosenFilmInfo: tempParsedJson,
                chosenOperation: 'editFilm'
            })
        })
        .catch(error => {
            this.setState({
                chosenOperation: ''
            });
            ApplicationService.informWithMessage({ 
                text: error.message,
                isError: true
            });
        });
    }

    createFilm(receivedFilmInfo){
        this.setState({
            chosenOperation: ''
        });
        fetch('api/films', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify(receivedFilmInfo)
        })
        .then(response => {
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
        })
        .then(response => {
            this.setState({
                filmList: this.state.filmList.concat({
                    name: receivedFilmInfo.name,
                    filmId: response.headers.get('location').substring(response.headers.get('location').lastIndexOf('/') + 1, response.headers.get('location').length)
                })
            });
            ApplicationService.informWithMessage('Film created.');
        })
        .catch(error => {
            ApplicationService.informWithMessage(
            { 
                text: error.message,
                isError: true
            });
        });
    }

    editFilm(receivedFilmInfo){
        this.setState({
            chosenOperation: ''
        });
        fetch(`api/films/${this.state.chosenFilmInfo.filmId}`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify(receivedFilmInfo)
        })
        .then(response => {
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
        })
        .then(parsedJson => {
            let tempFilmList = this.state.filmList;
            tempFilmList.find((el) => el.filmId === this.state.chosenFilmInfo.filmId).name = receivedFilmInfo.name;
            this.setState({
                filmList: tempFilmList
            })
            ApplicationService.informWithMessage('Film information edited.');
        })
        .catch(error => ApplicationService.informWithMessage(
            { 
                text: error.message,
                isError: true
            })
        );

        this.setState({
            chosenOperation: ''
        });
    }

    renderActionsContent(){
        return(
            <React.Fragment>
                <h1>Film list</h1>
                <div className="list-container">
                    {
                        this.state.filmList.map((el)=>
                            <FilmDisplayInfoBox
                                key={el.filmId}
                                filmInfo={el}
                                callBackEditFilm={this.getFilm}
                            />
                        )
                    }
                    <Button
                        bsStyle="primary"
                        onClick={ () => this.setState({ chosenOperation: 'createFilm' })}
                    >
                        Create film
                    </Button>
                </div>
            </React.Fragment>
        );
    }

    renderContent(){
        switch(this.state.chosenOperation){
            case 'createFilm':
                return( 
                    <FormFilm
                        callBackReceiveFilmInfo={this.createFilm}
                        callBackCancel={this.cancelCurrentOperation}
                    />
                );
            case 'editFilmLoading':
                return(
                    <div className="font-x-large font-italic">
                        Loading...
                    </div>
                );
            case 'editFilm': 
                return(
                    <FormFilm
                        filmInfo={this.state.chosenFilmInfo}
                        callBackReceiveFilmInfo={this.editFilm}
                        callBackCancel={this.cancelCurrentOperation}
                    />
                );
            default:    
                return this.renderActionsContent();
        }
    }

    render(){
        const content = this.renderContent();
        return(
            <div className="content-container">
                <div className="well">
                    {content}
                </div>
            </div>
        );
    }
}