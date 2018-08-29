import React from 'react';
import { Button } from 'react-bootstrap';

const SubmitCancelButtons = (props) =>{
    return(                
        <div className="button-container">
            <Button
                onClick={props.handleSubmitClick}
                bsStyle="primary"
            >
                Submit
            </Button>
            <Button
                onClick={props.handleCancelClick}
            >
                Cancel
            </Button>
        </div>
    );
}

export default SubmitCancelButtons;