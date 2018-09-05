import React from 'react';
import { FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import CinemaListDropDown from './CinemaListDropDown';

const ChooseCinemaWithDropDown = (props) =>{
    return(
        <FormGroup
            controlId="formChooseCinema"
            validationState={!props.showHint || props.chosenCinema ? null : 'error'}
        >
            <div>
                <ControlLabel
                    className="font-large"
                >
                    Cinema :
                    {
                        props.chosenCinema 
                        ? ` ${props.chosenCinema.name}, ${props.chosenCinema.city}`
                        : ''
                    }
                </ControlLabel>
            </div>
            <CinemaListDropDown
                id="choose-cinema-dropdown"
                list={props.list}
                handleElementSelect={props.handleElementSelect}
            />
            {
                !props.showHint || props.chosenCinema
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

export default ChooseCinemaWithDropDown;