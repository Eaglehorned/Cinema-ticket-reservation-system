import React from 'react';
import { FormControl, ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import ApplicationService from '../../Services/ApplicationService';

const InputIntFormGroup = (props) =>{
    return(
        <FormGroup
            className={props.isShown ? '' : 'hidden'}
            controlId={`form${props.label}Text`}
            validationState={ApplicationService.needToInformAboutInvalidInt(props.showHint, props.value) === ''
                ? null 
                : 'error'}
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
                
                <HelpBlock 
                    className="font-italic"
                >
                    {ApplicationService.needToInformAboutInvalidInt(props.showHint, props.value)}
                </HelpBlock> 
            }
        </FormGroup>    
    );
}

export default InputIntFormGroup;