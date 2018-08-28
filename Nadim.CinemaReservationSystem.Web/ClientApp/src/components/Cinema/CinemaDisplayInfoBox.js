import React from 'react';
import { Button } from 'react-bootstrap';
import DisplayInfoBoxField from '../DisplayInfoBoxField';

const CinemaDisplayInfoBox = (props) =>{

    return(
        <div className="list-box-container">
            <DisplayInfoBoxField
                label="Name"
                value={props.cinemaInfo.name}
            />
            <DisplayInfoBoxField
                displayThis={true}
                label="City"
                value={props.cinemaInfo.city}
            />
            <Button
                onClick={() => props.callBackEditCinema(props.cinemaInfo.cinemaId)}
            >
                Edit
            </Button>
        </div>
    );
}

export default CinemaDisplayInfoBox;