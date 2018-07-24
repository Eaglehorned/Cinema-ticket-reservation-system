import React, { Component } from 'react';
import SeatBoxForCreation from '../components/SeatBoxForCreation';

export default class SeatsScheme extends Component{
    displayName = SeatsScheme.displayName;

    constructor(props){
        super(props);
        this.handleSeatTypeChange = this.handleSeatTypeChange.bind(this);
        this.generateKey = this.generateKey.bind(this);
    }

    handleSeatTypeChange(dataToChangeSeatType){
        this.props.callBackFromParent(dataToChangeSeatType);
    }

    generateKey(row, column){
        return row * this.props.seatsArray.length + column;
    }

    render(){
        console.log(this.props.seatsArray);
        return(
            <div className="scheme-container">
                {this.props.seatsArray.map((item) =>
                    <div key={item[0].row}>
                        {item.map((itemArray) => 
                            <SeatBoxForCreation 
                                key={this.generateKey(itemArray.row, itemArray.column)} 
                                SeatInfo={{row: itemArray.row, column: itemArray.column}} 
                                callBackFromParent={this.handleSeatTypeChange}
                            />
                        )}           
                    </div>
                )}
            </div>
        )
    }
}