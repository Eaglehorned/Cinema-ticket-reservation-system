import React, { Component } from 'react';
import SeatsScheme from '../Cinema/SeatsScheme';
import ChosenSeatInfoBox from './ChosenSeatInfoBox';
import { Button } from 'react-bootstrap';

export default class ChooseSeats extends Component{
    displayName = ChooseSeats.displayName;

    render(){
        return(
            <div className="choose-container">
                <div className="seats-scheme-container">
                    <SeatsScheme
                        seatsArray={this.props.seats}
                        callBackFromParent={this.props.callBackHandleSeatClick}
                    />
                </div>
                <div className="chosen-seats-container">
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
                    <div className="font-x-large">
                        <span className="font-bold">Total check : </span>
                        {
                            this.props.chosenSeats.reduce((acc, current) => 
                                acc + this.props.sessionSeatTypePrices.find((typePrice) =>
                                    typePrice.typeName === current.type
                                ).price, 0)
                        }
                    </div>
                    <div>
                        <Button
                            bsStyle="primary"
                            bsSize="large"
                            disabled={this.props.chosenSeats.length === 0}
                            onClick={this.props.callBackHandleSeatsChoice}
                        >
                            Submit and go to check out
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={this.props.callBackCancelReservation}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}