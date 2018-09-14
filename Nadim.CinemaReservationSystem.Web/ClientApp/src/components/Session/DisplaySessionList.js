import React from 'react';
import { Button } from 'react-bootstrap';
import SessionListItem from './SessionListItem';

const DisplaySessionList = (props) =>{
    return(
        <div className="list-container">
            {
                props.list.map((el)=>
                    <SessionListItem
                        key={el.sessionId}
                        callBackFromParent={props.handleElementClick}
                        session={el}
                    />
                )
            }
            <div className="button-container"> 
                <Button
                    bsStyle="primary"
                    onClick={props.handleListButtonClick}
                >
                    Create session
                </Button>
            </div>
        </div>
    );
}

export default DisplaySessionList;