import React from 'react';
import { Button } from 'react-bootstrap';
import DisplayInfoBoxField from '../General/DisplayInfoBoxField';

const CinemaRoomListItem = (props) =>{
    return(
        <div                 
            className="list-box-container font-large"
        >
            <div>
                <DisplayInfoBoxField
                    label="Name"
                    value={props.cinemaRoom.name}
                />
            </div>
            <Button
                onClick={() => props.callBackFromParent(props.cinemaRoom.cinemaRoomId)}
            >
                Edit
            </Button>
        </div>
    );
}

export default CinemaRoomListItem;