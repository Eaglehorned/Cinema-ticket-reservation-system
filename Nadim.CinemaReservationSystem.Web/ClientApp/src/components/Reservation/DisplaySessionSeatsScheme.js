import React from 'react';
import SeatsScheme from '../Cinema/SeatsScheme';
import DisplaySeatTypes from './DisplaySeatTypes';

const DisplaySessionSeatsScheme = (props) =>{
    return(
        <div className="seats-scheme-container">
            <SeatsScheme
                seatsArray={props.seats}
                callBackFromParent={props.callBackHandleSeatClick}
            />
            <DisplaySeatTypes
                sessionSeatTypePrices={props.sessionSeatTypePrices}
            />
            {  
                props.chosenSeats.length === 10 
                ? <div className="font-large font-bold">
                    You have chosen maximum count of seats.
                </div>
                : ''
            }
        </div>
    );
}

export default DisplaySessionSeatsScheme;