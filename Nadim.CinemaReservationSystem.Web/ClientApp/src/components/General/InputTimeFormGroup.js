import React from 'react';
import { ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import { TimePicker } from 'antd';
import ValidationService from '../../Services/ValidationService';

const InputTimeFormGroup = (props) =>{
    return(
        <FormGroup
            validationState={ValidationService.showIsTimeValid(props.showHint, props.value)
                ? null 
                : 'error'}
            controlId={`form${props.label}Text`}
        >
            <ControlLabel
                className="font-bold-large"
            >
                {`${props.label} :`}
            </ControlLabel>
            <br/>
            <TimePicker
                value={props.value}
                onChange={props.handleValueChange}
            />
            { 
                ValidationService.showIsTimeValid(props.showHint, props.value)
                ? ''
                : <HelpBlock 
                    className="font-italic"
                >
                    Time must be entered.
                </HelpBlock> 
            }
        </FormGroup>
    );
}

export default InputTimeFormGroup;