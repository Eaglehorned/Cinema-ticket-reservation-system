import React from 'react';
import { Button } from 'react-bootstrap';
import CinemaRoomListItem from './CinemaRoomListItem';

const DisplayCinemaRoomsList = (props) =>{
    return(
        <div className="list-container">
            {
                props.list.map((el)=>
                    <CinemaRoomListItem
                        key={el.cinemaRoomId}
                        cinemaRoom={el}
                        callBackFromParent={props.handleElementClick}
                    />
                )
            }
            <div className="button-container"> 
                <Button
                    bsStyle="primary"
                    onClick={props.handleListButtonClick}
                >
                    Add cinema room
                </Button>
            </div>
        </div>
    );
}

export default DisplayCinemaRoomsList;
