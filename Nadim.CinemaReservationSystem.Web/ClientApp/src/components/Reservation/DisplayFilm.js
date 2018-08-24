import React, { Component } from 'react';
import DisplayCinema from './DisplayCinema';

export default class DisplayFilm extends Component{
    displayName = DisplayFilm.displayName;

    render(){
        const cinemas = this.props.sessions.map((el) =>el.cinema.cinemaId).filter((e, i, a) => a.indexOf(e) === i);
        return(
            <div className="session-film-display-container">
                <h2>{this.props.sessions[0].film.name}</h2>
                {
                    cinemas.map((c) =>
                        <DisplayCinema
                            key={c}
                            sessions={
                                this.props.sessions.filter(s => s.cinema.cinemaId === c)
                            }
                            callBackHandleSessionAction={this.props.callBackHandleSessionAction}
                        />
                    )
                }
            </div>
        );
    }
}