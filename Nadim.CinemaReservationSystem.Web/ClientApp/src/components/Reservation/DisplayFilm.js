import React, { Component } from 'react';
import DisplayCinema from './DisplayCinema';
import sessionService from '../../Services/SessionService';
import applicationService from '../../Services/ApplicationService';
import Loading from '../General/Loading';

export default class DisplayFilm extends Component{
    displayName = DisplayFilm.displayName;

    constructor(props){
        super(props);
        this.state={
            sessions: undefined,
            dataIsLoaded: false
        }
        // this.getSessionListWithFilters(this.props.location.search);
    }

    // getSessionListWithFilters = (searchString) =>{
    //     sessionService.getSessionListWithFilters(searchString)
    //     .then(requestedData => {
    //         this.setState({
    //             sessions: requestedData,
    //             dataIsLoaded: true
    //         });
    //     })
    //     .catch(error => applicationService.informWithErrorMessage(error));
    // }

    renderContent = () =>{
        return(
            <React.Fragment>
                
            </React.Fragment>
        );
    }

    render(){
        // const cinemas = this.props.sessions.map((el) =>el.cinema.cinemaId).filter((e, i, a) => a.indexOf(e) === i);
        const content = this.state.dataIsLoaded ? this.renderContent() : <Loading/>;
        return(
            // <div className="session-film-display-container">
            //     <h2>{this.props.sessions[0].film.name}</h2>
            //     {
            //         cinemas.map((c) =>
            //             <DisplayCinema
            //                 key={c}
            //                 sessions={
            //                     this.props.sessions.filter(s => s.cinema.cinemaId === c)
            //                 }
            //                 callBackHandleSessionAction={this.props.callBackHandleSessionAction}
            //             />
            //         )
            //     }
            // </div>
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
}