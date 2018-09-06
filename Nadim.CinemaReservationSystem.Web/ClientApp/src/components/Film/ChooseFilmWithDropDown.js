import React from 'react';
import { FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import CinemaRoomListDropDown from './FilmListDropDown';

const ChooseFilmWithDropDown = (props) =>{
    return(
        <FormGroup
            controlId="formChooseCinemaRoom"
            validationState={!props.showHint || props.chosenFilm ? null : 'error'}
        >
            <div>
                <ControlLabel
                    className="font-large"
                >
                    Film :
                    {
                        props.chosenFilm 
                        ? ` ${props.chosenFilm.name}`
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
                !props.showHint || props.chosenFilm
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

export default ChooseFilmWithDropDown;