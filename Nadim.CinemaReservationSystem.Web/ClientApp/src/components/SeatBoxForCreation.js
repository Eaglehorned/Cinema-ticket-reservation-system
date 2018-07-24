import React, { Component } from 'react';

export default class SeatBoxForCreation extends Component{
    displayName = SeatBoxForCreation.displayName;

    constructor(props){
        super(props);
        this.state={
            seatType:'',
        }
        this.handleOnSeatClick= this.handleOnSeatClick.bind(this);
    }

    handleOnSeatClick(){
        this.props.callBackFromParent(this.props.SeatInfo);
    }

    render(){
        let styleName = this.state.seatType ? "seat" : "seat " + this.state.seatType;
        return(
            <div className="seat" onClick={this.handleOnSeatClick}>
            </div>
        )
    }
}