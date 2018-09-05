import React, { Component } from 'react';
import FormFilm from './FormFilm';
import filmService from '../../Services/FilmService';
import applicationService from '../../Services/ApplicationService';
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
        filmService.getFilmList()
        .then(requestedData => {
            this.setState({
                filmList: requestedData,
            });
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    getFilm = (filmId) =>{
        this.setState({
            chosenOperation: 'editFilmLoading'
        });
        filmService.getFilm(filmId)
        .then(requestedData => {
            this.setState({
                chosenFilmInfo: requestedData,
                chosenOperation: 'editFilm'
            })
        })
        .catch(error => {
            applicationService.informWithErrorMessage(error);
            this.setState({
                chosenOperation: ''
            });
        });
    }

    createFilm = (cinemaInfo) =>{
        this.setState({
            chosenOperation: ''
        });
        filmService.createFilm(cinemaInfo)
        .then(filmId => {
            this.setState({
                filmList: this.state.filmList.concat({
                    name: cinemaInfo.name,
                    filmId: filmId
                })
            });
            applicationService.informWithMessage('Film created.');
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    editFilm = (filmInfo) =>{
        this.setState({
            chosenOperation: ''
        });
        filmService.editFilm(this.state.chosenFilmInfo.filmId, filmInfo)
        .then(() => {
            this.setState({
                filmList: filmService.updateFilmList(
                    this.state.filmList, 
                    this.state.chosenFilmInfo.filmId,
                    filmInfo
                )
            })
            applicationService.informWithMessage('Film information edited.');
        })
        .catch(error => applicationService.informWithErrorMessage(error));
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