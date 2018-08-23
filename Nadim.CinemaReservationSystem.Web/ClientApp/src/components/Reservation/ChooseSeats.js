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
                    <div className="seat-types-info-panel">
                        <div className="seat-type-info-block">
                            <div className="seat-booked"/>
                            <div className="font-large">Booked seat</div>
                        </div>
                        {this.props.sessionSeatTypePrices.find(el => el.typeName === 'default')
                            ? <React.Fragment>
                                    <div className="seat-type-info-block">
                                        <div className="seat-default"/>
                                        <div className="font-large">Available default seat</div>
                                    </div>
                                    <div className="seat-type-info-block">
                                        <div className="seat-default-chosen"/>
                                        <div className="font-large">Chosen default seat</div>
                                    </div>
                            </React.Fragment>
                            : ''
                        }
                        {this.props.sessionSeatTypePrices.find(el => el.typeName === 'vip')
                            ? <React.Fragment>
                                    <div className="seat-type-info-block">
                                        <div className="seat-vip"/>
                                        <div className="font-large">Available vip seat</div>
                                    </div>
                                    <div className="seat-type-info-block">
                                        <div className="seat-vip-chosen"/>
                                        <div className="font-large">Chosen vip seat</div>
                                    </div>
                            </React.Fragment>
                            : ''
                        }
                    </div>
                    {  
                        this.props.chosenSeats.length === 10 
                        ? <div className="font-large font-bold">
                            You have chosen maximum count of seats.
                        </div>
                        : ''
                    }
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