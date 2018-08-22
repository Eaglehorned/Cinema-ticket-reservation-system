import React, { Component } from 'react';
import SeatBox from './SeatBox';

export default class SeatsScheme extends Component{
    displayName = SeatsScheme.displayName;

    handleSeatClick = (seatInfo) =>{
        this.props.callBackFromParent(seatInfo);
    }

    generateKey = (row, column) =>{
        return row * this.props.seatsArray[0].length + column;
    }

    render(){
        return(
            <React.Fragment>
                <div className="scheme-container">
                    {this.props.seatsArray.map((item) =>
                        <div 
                            className="row"
                            key={item[0].row}>
                            {item.map((itemArray) =>
                                    <SeatBox 
                                    key={this.generateKey(itemArray.row, itemArray.column)}
                                    seatInfo={itemArray}
                                    callBackFromParent={this.handleSeatClick}
                                />
                            )}           
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}