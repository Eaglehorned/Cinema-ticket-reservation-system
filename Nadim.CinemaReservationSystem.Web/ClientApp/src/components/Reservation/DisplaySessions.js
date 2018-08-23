import React, { Component } from 'react';
import DisplayFilm from './DisplayFilm';

export default class DisplaySessions extends Component{
    displayName = DisplaySessions.displayName;

    render(){
        const films = this.props.sessions.map((el) =>el.film.filmId).filter((e, i, a) => a.indexOf(e) === i);
        return(
            <React.Fragment>
                {
                    films.map((f) =>
                        <DisplayFilm
                            key={f}
                            sessions={
                                this.props.sessions.filter(s => s.film.filmId === f)
                            }
                            callBackHandleSessionAction={this.props.callBackHandleSessionAction}
                        />
                    )
                }
            </React.Fragment>
        );
    }
}