import React from 'react';
import { Button } from 'react-bootstrap';
import DisplayInfoBoxField from '../General/DisplayInfoBoxField';

const CinemaListItem = (props) =>{
    return(
        <div                 
            className="list-box-container font-large"
        >
            <div>
                <DisplayInfoBoxField
                    label="Name"
                    value={props.cinema.name}
                />
                <DisplayInfoBoxField
                    label="City"
                    value={props.cinema.city}
                />
            </div>
            <Button
                onClick={() => props.callBackFromParent(props.cinema.cinemaId)}
            >
                Edit
            </Button>
        </div>
    );
}

export default CinemaListItem;