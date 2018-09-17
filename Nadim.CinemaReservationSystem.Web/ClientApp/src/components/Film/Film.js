import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
            chosenFilmInfo: undefined
        }
        this.getFilmList();
    }

    returnToFilmPage = () =>{
        this.props.history.push(`${this.props.match.url}`);
    }

    handleChooseEditFilmAction = (filmId) =>{
        this.getFilm(filmId)
        .then(() => this.props.history.push(`${this.props.match.url}/${filmId}`))
        .catch(error => {
            applicationService.informWithErrorMessage(error);
        });
    }

    handleChooseCreateFilmAction = () =>{
        this.props.history.push(`${this.props.match.url}/new`);
    }

    getFilmList = () =>{
        filmService.getFilmList()
        .then(requestedData => {
            this.setState({
                filmList: requestedData
            });
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    getFilm = (filmId) =>{
        return filmService.getFilm(filmId)
        .then(requestedData => {
            this.setState({
                chosenFilmInfo: requestedData
            })
        });
    }

    createFilm = (cinemaInfo) =>{
        this.returnToFilmPage();

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
        this.returnToFilmPage();

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
                    handleElementClick={this.handleChooseEditFilmAction}
                    handleListButtonClick={this.handleChooseCreateFilmAction}
                />
            </React.Fragment>
        );
    }

    renderContent = () =>{
        return(
            <Switch>
                <Route exact path={`${this.props.match.url}/new`} render={()=>(
                    <FormFilm
                        callBackReceiveFilmInfo={this.createFilm}
                        callBackCancel={this.returnToFilmPage}
                    />
                )}/>
                <Route path={`${this.props.match.url}/:id`} render={()=>(
                    <FormFilm
                        showHint={true}
                        filmInfo={this.state.chosenFilmInfo}
                        callBackReceiveFilmInfo={this.editFilm}
                        callBackCancel={this.returnToFilmPage}
                    />
                )}/>
                <Route exact path={`${this.props.match.url}`} render={()=> 
                    this.renderActionsContent()
                }/>
            </Switch>
        );
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