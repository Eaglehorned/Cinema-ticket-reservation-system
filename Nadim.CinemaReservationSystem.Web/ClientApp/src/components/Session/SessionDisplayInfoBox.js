import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import SessionDisplayInfoBoxField from './SessionDisplayInfoBoxField';

export default class SessionDisplayInfoBox extends Component{
    displayName = SessionDisplayInfoBox.displayName;

    render(){
        return(
            <div 
                className={this.props.mode === 'reserve' ? 'clickable-session-list-box-container' : 'list-box-container'}
                onClick={this.props.mode === 'reserve' 
                    ? () => this.props.callBackHandleSessionAction(this.props.sessionInfo.sessionId)
                    : () => {}}    
            >
                <div className="font-large">
                    <div>
                        <SessionDisplayInfoBoxField
                            displayThis={!this.props.displayedComponents || this.props.displayedComponents.cinema}
                            label='Cinema name'
                            value={this.props.sessionInfo.cinema.name}
                        />
                        <SessionDisplayInfoBoxField
                            displayThis={!this.props.displayedComponents || this.props.displayedComponents.cinema}
                            label='Cinema city'
                            value={this.props.sessionInfo.cinema.city}
                        />
                        <SessionDisplayInfoBoxField
                            displayThis={!this.props.displayedComponents || this.props.displayedComponents.cinemaRoom}
                            label='Cinema room'
                            value={this.props.sessionInfo.cinemaRoom.name}
                        />
                        <SessionDisplayInfoBoxField
                            displayThis={!this.props.displayedComponents || this.props.displayedComponents.film}
                            label='Film'
                            value={this.props.sessionInfo.film.name}
                        />
                    </div>
                    <div>
                        <SessionDisplayInfoBoxField
                            displayThis={!this.props.displayedComponents || this.props.displayedComponents.beginTime}
                            label='Time'
                            value={new Date(this.props.sessionInfo.beginTime).toLocaleString()}
                        />
                    </div>
                </div>
                <Button
                    onClick={() => this.props.callBackHandleSessionAction(this.props.sessionInfo.sessionId)}
                    hidden={this.props.mode == 'reserve'}
                >
                    {this.props.mode === 'reserve' ? 'Reserve' : 'Edit'}
                </Button>
            </div>
        );
    }
}