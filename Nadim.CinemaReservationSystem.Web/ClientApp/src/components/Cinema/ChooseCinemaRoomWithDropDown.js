import React from 'react';
import { FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import CinemaRoomListDropDown from './CinemaRoomListDropDown';

const ChooseCinemaRoomWithDropDown = (props) =>{
    return(
        <FormGroup
            controlId="formChooseCinemaRoom"
            validationState={!props.showHint || props.chosenCinemaRoom ? null : 'error'}
        >
            <div>
                <ControlLabel
                    className="font-large"
                >
                    Cinema room :
                    {
                        props.chosenCinemaRoom 
                        ? ` ${props.chosenCinemaRoom.name}`
                        : ''
                    }
                </ControlLabel>
            </div>
            <CinemaRoomListDropDown
                id="choose-cinema-room-dropdown"
                list={props.list}
                handleElementSelect={props.handleElementSelect}
            />
            {
                !props.showHint || props.chosenCinemaRoom
                ? ''
                : <HelpBlock 
                    className="font-italic"
                >
                    Cinema not chosen.
                </HelpBlock> 
            }
        </FormGroup>
    );
}

export default ChooseCinemaRoomWithDropDown;