import React from 'react';
import { ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import { DatePicker } from 'antd';
import ValidationService from '../../Services/ValidationService';

const InputFutureDateFormGroup = (props) =>{
    return(
        <FormGroup
            controlId={`form${props.label}Text`}
            validationState={ValidationService.showIsFutureDateValid(props.showHint, props.value)
                ? null 
                : 'error'}
        >
            <ControlLabel
                className="font-bold-large"
            >
                {`${props.label} :`}
            </ControlLabel>
            <br/>
            <DatePicker
                value={props.value}
                onChange={props.handleValueChange}
            />
            { 
                <HelpBlock 
                    className="font-italic"
                >
                    {ValidationService.futureDateValidationErrorMessage(props.showHint, props.value)}
                </HelpBlock> 
            }
        </FormGroup>    
    );
}

export default InputFutureDateFormGroup;