import React, { Component } from 'react';

export default class ChosenSeatInfoBox extends Component{
    displayName = ChosenSeatInfoBox.displayName;

    render(){
        return(
            <div className="seat-info-block font-large">
                <div>
                    Row {this.props.seatInfo.row + 1} / Seat {this.props.seatInfo.column + 1}
                </div>
                <div>
                    Type : {this.props.seatInfo.type}
                </div>
                <div>
                    Price : {this.props.price}
                </div>
            </div>
        );
    }
}