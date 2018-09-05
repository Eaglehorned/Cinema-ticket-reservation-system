import React from 'react';
import { ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import { DatePicker } from 'antd';

const InputDateFormGroup = (props) =>{
    return(
        <FormGroup
            controlId={`form${props.label}Text`}
            validationState={!props.showHint || props.isValid
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
                !props.showHint || props.isValid
                ? ''
                : <HelpBlock 
                    className="font-italic"
                >
                    {props.errorString}
                </HelpBlock> 
            }
        </FormGroup>    
    );
}

export default InputDateFormGroup;