import React from 'react';
import { Button } from 'react-bootstrap';
import CinemaListItem from './CinemaListItem';

const DisplayCinemaList = (props) =>{
    return(
        <div className="list-container">
            {
                props.list.map((el)=>
                    <CinemaListItem
                        key={el.cinemaId}
                        callBackFromParent={props.handleElementClick}
                        cinema={el}
                    />
                )
            }
            <div className="button-container"> 
                <Button
                    bsStyle="primary"
                    onClick={props.handleListButtonClick}
                >
                    Create cinema
                </Button>
            </div>
        </div>
    );
}

export default DisplayCinemaList;