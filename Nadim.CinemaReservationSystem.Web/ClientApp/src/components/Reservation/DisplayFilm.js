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
            dataIsLoaded: false,
            startDate: undefined,
            endDate: undefined
        }
    }

    componentWillMount(){
        this.getFilmSessionList(this.props.match.params.filmId, applicationService.getFromTodayTimeSearchString());
        if (!this.props.location.search){
            this.props.history.push(`${this.props.match.url}${applicationService.getFromTodayTimeSearchString()}`);
        }
        else{
            this.setFilterDates(this.props.location.search);
        }
    }
    
    componentWillReceiveProps(nextProps){
        if (this.props.location.search !== nextProps.location.search){
            this.setFilterDates(nextProps.location.search);
        }
    }

    setFilterDates = (searchString) =>{
        const dates = applicationService.parseQueryString(searchString);
        if (dates.startDate){
            dates.startDate = moment(dates.startDate);
        }
        if (dates.endDate){
            dates.endDate = moment(dates.endDate);
        }
        this.setState({
            startDate: dates.startDate,
            endDate: dates.endDate
        });
    }

    filterSessionsByDate = (sessions, startDate, endDate) =>{
        let filteredSessions = sessions;
        if(startDate){
            filteredSessions = filteredSessions.filter(el => startDate.isSameOrBefore(moment(el.beginTime)));
        }
        if(endDate){
            filteredSessions = filteredSessions.filter(el => endDate.isSameOrAfter(moment(el.beginTime)));
        }
        return filteredSessions;
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
                sessions={this.filterSessionsByDate(this.state.sessions, this.state.startDate, this.state.endDate)}
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