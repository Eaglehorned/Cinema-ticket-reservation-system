import React from 'react';
import { Button } from 'react-bootstrap';
import DisplayInfoBoxField from '../General/DisplayInfoBoxField';

const SessionListItem = (props) =>{
        return(
            <div 
                className={props.mode === 'reserve' ? 'clickable-session-list-box-container' : 'list-box-container'}
                onClick={props.mode === 'reserve' 
                    ? () => props.callBackFromParent(props.session.sessionId)
                    : () => {}}    
            >
                <div className="font-large">
                    <div>
                        <DisplayInfoBoxField
                            displayThis={!props.displayedComponents || props.displayedComponents.cinema ? true : false}
                            label='Cinema name'
                            value={props.session.cinema.name}
                        />
                        <DisplayInfoBoxField
                            displayThis={!props.displayedComponents || props.displayedComponents.cinema ? true : false}
                            label='Cinema city'
                            value={props.session.cinema.city}
                        />
                        <DisplayInfoBoxField
                            displayThis={!props.displayedComponents || props.displayedComponents.cinemaRoom ? true : false}
                            label='Cinema room'
                            value={props.session.cinemaRoom.name}
                        />
                        <DisplayInfoBoxField
                            displayThis={!props.displayedComponents || props.displayedComponents.film ? true : false}
                            label='Film'
                            value={props.session.film.name}
                        />
                    </div>
                    <div>
                        <DisplayInfoBoxField
                            displayThis={!props.displayedComponents || props.displayedComponents.beginTime ? true : false}
                            label='Time'
                            value={new Date(props.session.beginTime).toLocaleString()}
                        />
                    </div>
                </div>
                <Button
                    onClick={() => props.callBackFromParent(props.session.sessionId)}
                    hidden={props.mode === 'reserve'}
                >
                    {props.mode === 'reserve' ? 'Reserve' : 'Edit'}
                </Button>
            </div>
        );
}

export default SessionListItem;