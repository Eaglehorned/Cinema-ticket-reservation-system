import React, { Component } from 'react';
import SeatsScheme from '../Cinema/SeatsScheme';
import ChosenSeatInfoBox from './ChosenSeatInfoBox';
import { Button } from 'react-bootstrap';

const ChooseSeats = (props) =>{
    
    return(
        <div className="choose-container">
            <div className="seats-scheme-container">
                <SeatsScheme
                    seatsArray={props.seats}
                    callBackFromParent={props.callBackHandleSeatClick}
                />
                <div className="seat-types-info-panel">
                    <div className="seat-type-info-block">
                        <div className="seat-booked"/>
                        <div className="font-large">Booked seat</div>
                    </div>
                    {props.sessionSeatTypePrices.find(el => el.typeName === 'default')
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
                    {props.sessionSeatTypePrices.find(el => el.typeName === 'vip')
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
                    props.chosenSeats.length === 10 
                    ? <div className="font-large font-bold">
                        You have chosen maximum count of seats.
                    </div>
                    : ''
                }
            </div>
            <div className="chosen-seats-container">
                <div className="seat-info-list-container">
                {
                    props.chosenSeats.map((el)=>
                        <ChosenSeatInfoBox
                            key={el.sessionSeatId}
                            seatInfo={el}
                            price={props.sessionSeatTypePrices.find((typePrice) => 
                                typePrice.typeName === el.type
                            ).price}
                        />
                    )
                }
                </div>
                <div className="font-x-large">
                    <span className="font-bold">Total check : </span>
                    {
                        props.chosenSeats.reduce((acc, current) => 
                            acc + props.sessionSeatTypePrices.find((typePrice) =>
                                typePrice.typeName === current.type
                            ).price, 0)
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