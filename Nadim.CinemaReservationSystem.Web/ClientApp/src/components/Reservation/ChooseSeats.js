import React from 'react';
import { Button } from 'react-bootstrap';
import DisplayChosenSeats from './DisplayChosenSeats';
import DisplaySessionSeatsScheme from './DisplaySessionSeatsScheme';
import ReservationServise from '../../Services/ReservationService';

const ChooseSeats = (props) =>{
    
    return(
        <div className="choose-container">
            <DisplaySessionSeatsScheme
                seats={props.seats}
                callBackHandleSeatClick={props.callBackHandleSeatClick}
                sessionSeatTypePrices={props.sessionSeatTypePrices}
                chosenSeats={props.chosenSeats}
            />
            <div className="chosen-seats-container">
                <DisplayChosenSeats
                    chosenSeats={props.chosenSeats}
                    sessionSeatTypePrices={props.sessionSeatTypePrices}
                />
                <div className="font-x-large">
                    <span className="font-bold">Total check : </span>
                    {
                        ReservationServise.countUpTotalPrice(props.chosenSeats, props.sessionSeatTypePrices)
                    }
                </div>
                <div>
                    <Button
                        bsStyle="primary"
                        bsSize="large"
                        disabled={props.chosenSeats.length === 0}
                        onClick={props.callBackHandleSeatsChoice}
                    >
                        Submit and go to check out
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={props.callBackCancelReservation}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ChooseSeats;