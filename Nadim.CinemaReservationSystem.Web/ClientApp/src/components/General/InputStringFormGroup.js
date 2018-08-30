import React from 'react';
import { FormControl, ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import ValidationService from '../../Services/ValidationService';

const InputStringFormGroup = (props) =>{
    return(
        <FormGroup
            className={props.isShown ? '' : 'hidden'}
            controlId={`form${props.label}Text`}
            validationState={ValidationService.showIsStringValid(props.showHint, props.value) ? null : 'error'}
        >
            <ControlLabel
                className="font-bold-large"
            >
                {`${props.label} :`}
            </ControlLabel>
            <FormControl
                type="text"
                value={props.value}
                placeholder={props.label}
                onChange={props.handleValueChange}
            />
            {
                ValidationService.showIsStringValid(props.showHint, props.value)
                ? ''
                : <HelpBlock 
                    className="font-italic"
                >
                    Data not entered.
                </HelpBlock> 
            }
        </FormGroup>    
    );
}

export default InputStringFormGroup;