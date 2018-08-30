import React from 'react';
import { ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import ValidationService from '../../Services/ValidationService';
import { TimePicker } from 'antd';

const InputDurationFormGroup = (props) =>{
    return(
        <FormGroup
            controlId={`form${props.label}Text`}
            validationState={ValidationService.showIsDurationValid(props.showHint, props.value)
                ? null 
                : 'error'}
        >
            <ControlLabel
                className="font-bold-large"
            >
                {`${props.label} :`}
            </ControlLabel>
            <br/>
            <TimePicker
                defaultValue={props.value}
                onChange={props.handleValueChange}
            />
            { 
                ValidationService.showIsDurationValid(props.showHint, props.value)
                ? ''
                : <HelpBlock 
                    className="font-italic"
                >
                    Duration cant be zero.
                </HelpBlock> 
            }
        </FormGroup>    
    );
}

export default InputDurationFormGroup;