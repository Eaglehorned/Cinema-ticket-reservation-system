import React from 'react';
import { FormControl, ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import ApplicationService from '../../Services/ApplicationService';

const InputStringFormGroup = (props) =>{
    return(
        <FormGroup
            className={props.isShown ? '' : 'hidden'}
            controlId={`form${props.label}Text`}
            validationState={ApplicationService.needToInformAboutInvalidString(props.showHint, props.value) ? null : 'error'}
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
                ApplicationService.needToInformAboutInvalidString(props.showHint, props.value)
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