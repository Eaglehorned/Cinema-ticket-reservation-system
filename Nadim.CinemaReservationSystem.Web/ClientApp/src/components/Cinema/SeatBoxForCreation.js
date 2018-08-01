import React, { Component } from 'react';

export default class SeatBoxForCreation extends Component{
    displayName = SeatBoxForCreation.displayName;

    constructor(props){
        super(props);
        this.handleOnSeatClick= this.handleOnSeatClick.bind(this);
    }

    handleOnSeatClick(){
        this.props.callBackFromParent(this.props.seatInfo);
    }

    render(){
        const styleName = `seat-${this.props.seatInfo.type}`;
        return(
            <div className={styleName} onClick={this.handleOnSeatClick}>
            </div>
        );
    }
}