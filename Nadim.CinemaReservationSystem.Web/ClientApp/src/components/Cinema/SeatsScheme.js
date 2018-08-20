import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import SeatBox from './SeatBox';

export default class SeatsScheme extends Component{
    displayName = SeatsScheme.displayName;

    constructor(props){
        super(props);
        this.state={
            mode: this.props.mode ? this.props.mode : 'edit'
        }
        this.handleSeatTypeChange = this.handleSeatTypeChange.bind(this);
        this.generateKey = this.generateKey.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    handleSeatTypeChange(dataToChangeSeatType){
        this.props.callBackFromParent(dataToChangeSeatType);
    }

    handleSubmitClick(){
        this.props.callBackSubmit();
    }

    handleCancelClick(){
        this.props.callBackCancel();
    }

    generateKey(row, column){
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
                            {
                                console.log(itemArray);
                                    return <SeatBox 
                                    key={this.generateKey(itemArray.row, itemArray.column)}
                                    seatInfo={{row: itemArray.row, column: itemArray.column, type: itemArray.type}}
                                    booked={itemArray.booked ? true : false}
                                    callBackFromParent={this.handleSeatTypeChange}
                                />
                            }
                            )}           
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}