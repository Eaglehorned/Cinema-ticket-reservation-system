import React, { Component } from 'react';
import FormFilm from './FormFilm';
import FilmService from '../../Services/FilmService';
import ApplicationService from '../../Services/ApplicationService';
import DisplayFilmList from './DisplayFilmList';

export default class Film extends Component{
    displayName = Film.displayName;
    
    constructor(props){
        super(props);
        this.state={
            filmList:[],
            chosenOperation: '',
            chosenFilmInfo: undefined
        }
        this.getFilmList();
    }

    cancelCurrentOperation = () =>{
        this.setState({
            chosenOperation: ''
        });
    }

    handleChooseCreateFilmOperation = () =>{
        this.setState({
            chosenOperation: 'createFilm'
        });
    }

    getFilmList = () =>{
        FilmService.getFilmList()
        .then(requestedData => {
            this.setState({
                filmList: requestedData,
            });
        })
        .catch(error => ApplicationService.informWithErrorMessage(error));
    }

    getFilm = (filmId) =>{
        this.setState({
            chosenOperation: 'editFilmLoading'
        });
        FilmService.getFilm(filmId)
        .then(requestedData => {
            this.setState({
                chosenFilmInfo: requestedData,
                chosenOperation: 'editFilm'
            })
        })
        .catch(error => {
            ApplicationService.informWithErrorMessage(error);
            this.setState({
                chosenOperation: ''
            });
        });
    }

    createFilm = (cinemaInfo) =>{
        this.setState({
            chosenOperation: ''
        });
        FilmService.createFilm(cinemaInfo)
        .then(filmId => {
            this.setState({
                filmList: this.state.filmList.concat({
                    name: cinemaInfo.name,
                    filmId: filmId
                })
            });
            ApplicationService.informWithMessage('Film created.');
        })
        .catch(error => ApplicationService.informWithErrorMessage(error));
    }

    editFilm = (filmInfo) =>{
        this.setState({
            chosenOperation: ''
        });
        FilmService.editFilm(this.state.chosenFilmInfo.filmId, filmInfo)
        .then(() => {
            let tempFilmList = this.state.filmList;
            tempFilmList.find((el) => el.filmId === this.state.chosenFilmInfo.filmId).name = filmInfo.name;
            this.setState({
                filmList: tempFilmList
            })
            ApplicationService.informWithMessage('Film information edited.');
        })
        .catch(error => ApplicationService.informWithErrorMessage(error));
    }

    renderActionsContent = () =>{
        return(
            <React.Fragment>
                <h1>Film list</h1>
                <DisplayFilmList
                    list={this.state.filmList}
                    handleElementClick={this.getFilm}
                    handleListButtonClick={this.handleChooseCreateFilmOperation}
                />
            </React.Fragment>
        );
    }

    renderContent = () =>{
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
                        showHint={true}
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