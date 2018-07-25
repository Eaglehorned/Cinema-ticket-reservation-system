import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import SeatBoxForCreation from '../components/SeatBoxForCreation';

export default class SeatsSchemeForCreation extends Component{
    displayName = SeatsSchemeForCreation.displayName;

    constructor(props){
        super(props);
        this.handleSeatTypeChange = this.handleSeatTypeChange.bind(this);
        this.generateKey = this.generateKey.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    handleSeatTypeChange(dataToChangeSeatType){
        this.props.callBackFromParent(dataToChangeSeatType);
    }

    handleCreateClick(){
        this.props.callBackCreateCinema();
    }

    handleCancelClick(){
        this.props.callBackCancelCinemaDataInput();
    }

    generateKey(row, column){
        return row * this.props.seatsArray[0].length + column;
    }

    render(){
        return(
            <div>
                <div className="scheme-container">
                    {this.props.seatsArray.map((item) =>
                        <div key={item[0].row}>
                            {item.map((itemArray) => 
                                <SeatBoxForCreation 
                                    key={this.generateKey(itemArray.row, itemArray.column)}
                                    seatInfo={{row: itemArray.row, column: itemArray.column, type: itemArray.type}}
                                    callBackFromParent={this.handleSeatTypeChange}
                                />
                            )}           
                        </div>
                    )}
                </div>
                <div className="button-container">
                    <Button
                        bsStyle="primary" onClick={this.handleCreateClick}
                    >
                        Create
                    </Button>
                    <Button 
                        onClick={this.handleCancelClick}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        )
    }
}