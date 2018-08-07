import React, { Component } from 'react';

export default class SeatBox extends Component{
    displayName = SeatBox.displayName;

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