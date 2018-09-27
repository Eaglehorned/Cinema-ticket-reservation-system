import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DisplayFilm from './DisplayFilm';
import img1 from '../Images/post-image-1.jpg';
import sessionService from '../../Services/SessionService';
import applicationService from '../../Services/ApplicationService';
import Loading from '../General/Loading';
import EventCard from './EventCard';

class DisplaySessions extends Component{
    displayName = DisplaySessions.displayName;

    constructor(props){
        super(props);
        this.state={
            sessions: undefined,
            dataIsLoaded: false,
        }
    }
    
    componentWillReceiveProps(nextProps){
        if (this.props.location.search !== nextProps.location.search){
            this.getSessionListWithFilters(nextProps.location.search);
        }
    }

    componentWillMount(){
        this.getSessionListWithFilters(this.props.location.search);
    }

    getSessionListWithFilters = (searchString) =>{
        sessionService.getSessionListWithFilters(searchString)
        .then(requestedData => {
            this.setState({
                sessions: requestedData,
                dataIsLoaded: true
            });
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    renderSessionByFilms = () =>{
        const films = this.state.sessions.map((el) =>el.film.filmId).filter((e, i, a) => a.indexOf(e) === i);
        return(            
            // <div className="list-container">
            <React.Fragment>
                {
                    films.map((filmId) =>{
                        // console.log(this.state.sessions.filter(s => s.film.filmId === filmId));
                        // return <DisplayFilm
                        //     key={filmId}
                        //     sessions={
                        //         this.state.sessions.filter(s => s.film.filmId === filmId)
                        //     }
                        //     callBackHandleSessionAction={this.props.callBackHandleSessionAction}
                        // />
                        return <EventCard
                            key={filmId}
                            film={{
                                ...this.state.sessions.find(s => s.film.filmId === filmId).film,
                                posterImage: img1
                            }}
                        />
                    })
                }
            </React.Fragment>
            // </div>
        );
    }

    render(){
        const content = this.state.dataIsLoaded
        ? this.renderSessionByFilms()
        : <Loading/>
        return(
            <React.Fragment>
               {content}
            </React.Fragment>
        );
    }
}

export default withRouter(DisplaySessions);