import React, { Component } from 'react';
import SessionListItem from '../Session/SessionListItem';

export default class DisplayCinema extends Component{
    displayName = DisplayCinema.displayName;

    render(){
        return(
            <div className="session-cinema-display-container">
                <h3>{this.props.sessions[0].cinema.name}</h3>
                <div className="list-container">
                    {
                        this.props.sessions.map((el)=>
                            <SessionListItem
                                displayedComponents={{
                                    cinemaRoom: true,
                                    film: true,
                                    beginTime: true
                                }}
                                key={el.sessionId}
                                session={el}
                                callBackFromParent={this.props.callBackHandleSessionAction}
                                mode="reserve"
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}