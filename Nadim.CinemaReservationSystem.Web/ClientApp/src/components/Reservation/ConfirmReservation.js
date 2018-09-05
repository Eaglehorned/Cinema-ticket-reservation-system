import React from 'react';
import { Button } from 'react-bootstrap';
import DisplayChosenSeats from './DisplayChosenSeats';
import reservationServise from '../../Services/ReservationService';

const ConfirmReservation = (props) =>{

    return(
        <div className="confirm-reservation-container">
            <div className="chosen-seats-container">
                <div className="font-bold-x-large">
                    My tickets
                </div>
                <DisplayChosenSeats
                    chosenSeats={props.chosenSeats}
                    sessionSeatTypePrices={props.sessionSeatTypePrices}
                />
            </div>
            <div className="confirm-content-container">
                <div className="confirm-components-block font-large">
                    <div className="font-bold-x-large">
                        Total check
                    </div>       
                    <div>
                        Total : 
                        <span className="font-x-large font-bold">         
                        {
                            reservationServise.countUpTotalPrice(props.chosenSeats, props.sessionSeatTypePrices)
                        }
                        </span>
                    </div>
                    <div>
                        <Button
                            bsStyle="primary"
                            onClick={props.callBackConfirmReservation}
                        >
                            Book tickets
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={props.callBackCancelConfirm}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmReservation;