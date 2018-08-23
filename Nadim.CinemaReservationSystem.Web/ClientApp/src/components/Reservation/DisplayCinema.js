import React, { Component } from 'react';
import SessionDisplayInfoBox from '../Session/SessionDisplayInfoBox';

export default class DisplayCinema extends Component{
    displayName = DisplayCinema.displayName;

    render(){
        return(
            <div className="session-cinema-display-container">
                <h3>{this.props.sessions[0].cinema.name}</h3>
                <div className="list-container">
                    {
                        this.props.sessions.map((el)=>
                            <SessionDisplayInfoBox
                                key={el.sessionId}
                                sessionInfo={el}
                                callBackHandleSessionAction={this.props.callBackHandleSessionAction}
                                mode={'reserve'}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}