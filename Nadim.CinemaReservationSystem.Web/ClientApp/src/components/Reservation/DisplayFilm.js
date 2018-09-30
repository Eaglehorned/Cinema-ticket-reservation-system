import React, { Component } from 'react';
import applicationService from '../../Services/ApplicationService';
import Loading from '../General/Loading';
import img1 from '../Images/post-image-1.jpg';
import filmService from '../../Services/FilmService';
import '../../styles/DisplayFilm.css';
import CinemaSessionTimes from './CinemaSessionTimes';

export default class DisplayFilm extends Component{
    displayName = DisplayFilm.displayName;

    constructor(props){
        super(props);
        this.state={
            sessions: undefined,
            dataIsLoaded: false
        }
        this.getFilmSessionList(this.props.match.params.filmId);
    }

    getFilmSessionList = (filmId) =>{
        filmService.getFilmSessionsList(filmId)
        .then(requestedData => {
            this.setState({
                sessions: requestedData,
                dataIsLoaded: true
            });
            console.log(requestedData);
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    renderContent = () =>{
        const cinemas = this.state.sessions.map((el) =>el.cinema.cinemaId).filter((e, i, a) => a.indexOf(e) === i);
        return(
            <div>
                <div className ="movie-container">
                    <div className="movie-info">
                        <div className="image-container">
                            <img className="movie-info-image" alt="movie poster image" src={img1}/>
                        </div>
                        <div className="movie-info-main">
                            <h1>
                                {this.state.sessions[0].film.name}
                            </h1>
                        </div>
                    </div>
                    <div className="movie-times">
                        {cinemas.map((cinemaId) =>
                            <CinemaSessionTimes
                                key={cinemaId}
                                sessions={this.state.sessions.filter((el) => 
                                    el.cinema.cinemaId === cinemaId
                                )}
                            />    
                        )}
                    </div>
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