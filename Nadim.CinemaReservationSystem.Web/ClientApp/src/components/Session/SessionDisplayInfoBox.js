import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DisplayInfoBoxField from '../DisplayInfoBoxField';

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
                        <DisplayInfoBoxField
                            displayThis={!this.props.displayedComponents || this.props.displayedComponents.cinema}
                            label='Cinema name'
                            value={this.props.sessionInfo.cinema.name}
                        />
                        <DisplayInfoBoxField
                            displayThis={!this.props.displayedComponents || this.props.displayedComponents.cinema}
                            label='Cinema city'
                            value={this.props.sessionInfo.cinema.city}
                        />
                        <DisplayInfoBoxField
                            displayThis={!this.props.displayedComponents || this.props.displayedComponents.cinemaRoom}
                            label='Cinema room'
                            value={this.props.sessionInfo.cinemaRoom.name}
                        />
                        <DisplayInfoBoxField
                            displayThis={!this.props.displayedComponents || this.props.displayedComponents.film}
                            label='Film'
                            value={this.props.sessionInfo.film.name}
                        />
                    </div>
                    <div>
                        <DisplayInfoBoxField
                            displayThis={!this.props.displayedComponents || this.props.displayedComponents.beginTime}
                            label='Time'
                            value={new Date(this.props.sessionInfo.beginTime).toLocaleString()}
                        />
                    </div>
                </div>
                <Button
                    onClick={() => this.props.callBackHandleSessionAction(this.props.sessionInfo.sessionId)}
                    hidden={this.props.mode === 'reserve'}
                >
                    {this.props.mode === 'reserve' ? 'Reserve' : 'Edit'}
                </Button>
            </div>
        );
    }
}