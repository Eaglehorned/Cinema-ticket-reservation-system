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
        this.props.history.push(`${this.props.match.url}/${filmId}`);
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

    createFilm = (filmInfo) =>{
        this.returnToFilmPage();

        filmService.createFilm(filmInfo)
        .then(filmId => {
            this.setState({
                filmList: this.state.filmList.concat({
                    name: filmInfo.name,
                    filmId: filmId
                })
            });
            applicationService.informWithMessage('Film created.');
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    editFilm = (filmInfo) =>{
        this.returnToFilmPage();
        filmService.editFilm(
            filmInfo.filmId,
            filmInfo)
        .then(() => {
            this.setState({
                filmList: filmService.updateFilmList(
                    this.state.filmList, 
                    filmInfo.filmId,
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
                        callBackReturnToUpperPage={this.returnToFilmPage}
                    />
                )}/>
                <Route path={`${this.props.match.url}/:id`} render={()=>(
                    <FormFilm
                        showHint={true}
                        callBackReceiveFilmInfo={this.editFilm}
                        callBackReturnToUpperPage={this.returnToFilmPage}
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