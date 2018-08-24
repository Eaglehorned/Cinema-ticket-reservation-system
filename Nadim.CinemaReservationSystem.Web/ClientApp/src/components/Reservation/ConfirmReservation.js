import React, { Component } from 'react';
import ChosenSeatInfoBox from './ChosenSeatInfoBox';
import { Button } from 'react-bootstrap';

export default class ConfirmReservation extends Component{
    displayName = ConfirmReservation.displayName;

    render(){
        return(
            <div className="confirm-reservation-container">
                <div className="chosen-seats-container">
                    <div className="font-bold-x-large">
                        My tickets
                    </div>
                    <div className="seat-info-list-container">
                        {
                            this.props.chosenSeats.map((el)=>
                                <ChosenSeatInfoBox
                                    key={el.sessionSeatId}
                                    seatInfo={el}
                                    price={this.props.sessionSeatTypePrices.find((typePrice) => 
                                        typePrice.typeName === el.type
                                    ).price}
                                />
                            )
                        }
                    </div>
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
                                this.props.chosenSeats.reduce((acc, current) => 
                                acc + this.props.sessionSeatTypePrices.find((typePrice) =>
                                    typePrice.typeName === current.type
                                ).price, 0)
                            }
                            </span>
                        </div>
                        <div>
                            <Button
                                bsStyle="primary"
                                onClick={this.props.callBackConfirmReservation}
                            >
                                Book tickets
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={this.props.callBackCancelConfirm}
                            >
                                Back
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}