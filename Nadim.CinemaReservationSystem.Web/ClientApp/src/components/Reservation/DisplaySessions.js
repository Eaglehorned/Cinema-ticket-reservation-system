import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DisplayFilm from './DisplayFilm';
import sessionService from '../../Services/SessionService';
import applicationService from '../../Services/ApplicationService';
import Loading from '../General/Loading';

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
            <div className="list-container">
                {
                    films.map((f) =>
                        <DisplayFilm
                            key={f}
                            sessions={
                                this.state.sessions.filter(s => s.film.filmId === f)
                            }
                            callBackHandleSessionAction={this.props.callBackHandleSessionAction}
                        />
                    )
                }
            </div>
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