import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import moment from 'moment';
import applicationService from '../../Services/ApplicationService';
import Loading from '../General/Loading';
import img1 from '../Images/post-image-1.jpg';
import filmService from '../../Services/FilmService';
import DisplayCinemaSessionsTimesByDate from './DisplayCinemaSessionsTimesByDate';
import FilmDatesPanel from './FilmDatesPanel';
import '../../styles/DisplayFilm.css';

export default class DisplayFilm extends Component{
    displayName = DisplayFilm.displayName;

    constructor(props){
        super(props);
        this.state={
            film: undefined,
            sessions: undefined,
            dataIsLoaded: false
        }
    }

    componentWillMount(){
        if(this.props.location.search === applicationService.getFromTodayTimeSearchString()){
            this.getFilmSessionList(this.props.match.params.filmId, this.props.location.search);
        }
        else{
            this.props.history.push(`${this.props.match.url}${applicationService.getFromTodayTimeSearchString()}`);
        }
    }
    
    componentWillReceiveProps(nextProps){
        if (this.props.location.search !== nextProps.location.search){
            this.getFilmSessionList(this.props.match.params.filmId, nextProps.location.search);
        }
    }

    getFilmSessionList = (filmId, searchString) =>{
        filmService.getFilm(filmId)
        .then(requestedData =>{
            this.setState({
                film: requestedData
            })
        })
        .then(() => filmService.getFilmSessionsList(filmId, searchString))
        .then(requestedData => {
            this.setState({
                sessions: requestedData,
                dataIsLoaded: true
            });
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    renderNothingFound = () =>{
        return(
            <div className="font-bold font-x-large">
                Nothing found.
            </div>
        );
    }

    renderContent = () =>{
        let cinemasSessionsTimes;
        
        if (this.state.sessions.length === 0){
            cinemasSessionsTimes = this.renderNothingFound();
        }
        else{
            cinemasSessionsTimes = <DisplayCinemaSessionsTimesByDate
                sessions={this.state.sessions}
            />;
        }

        return(
            <div>
                <Route path={`${this.props.match.url}`} render={() =>(<FilmDatesPanel
                   dates={this.state.sessions.map((el) =>moment(el.beginTime).format('L')).filter((e, i, a) => a.indexOf(e) === i)} 
                />)}/>
                <div className ="movie-container">
                    <div className="movie-info">
                        <div className="image-container">
                            <img className="movie-info-image" alt="movie poster" src={img1}/>
                        </div>
                        <div className="movie-info-main">
                            <h1>
                                {this.state.film.name}
                            </h1>
                        </div>
                    </div>
                    {cinemasSessionsTimes}
                </div>
            </div>
        );
    }

    render(){
        const content = this.state.dataIsLoaded ? this.renderContent() : <Loading/>;
        return(
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
}