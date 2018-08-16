import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

export default class SeatTypePrice extends Component{
    displayName = SeatTypePrice.displayName;

    constructor(props){
        super(props);
    }

    validateDoubleNumber(number){
        const result = /^\d+([.,]\d+)?$/;
        return result.test(String(number));
    }

    validatePrice = () => {
        return !this.props.showHint || this.validateDoubleNumber(this.props.seatType.price);
    }

    renderHelpBlock = () =>{
        if (this.props.showHint){
            return this.props.seatType.price
            ?(this.validateDoubleNumber(this.props.seatType.price)
                ? ''
                :<HelpBlock 
                    className="font-italic"
                >
                    Data not valid
                </HelpBlock>
            )
            :<HelpBlock 
                className="font-italic"
            >
                Data not entered
            </HelpBlock>
        }
        else{
            return '';
        }
    }

    handlePriceChange = (event) =>{
        this.props.callBackChangePrice({
            seatTypeId: this.props.seatType.seatTypeId,
            price: event.target.value
        })
    }

    render(){
        return(
            <div className="list-box-container">
                <FormGroup
                    validationState={this.validatePrice() ? null : 'error'}
                >
                    <ControlLabel
                        className="font-large"
                    >
                        {this.props.seatType.typeName} : 
                    </ControlLabel>
                    <FormControl
                        value={this.props.SeatTypePrice}
                        onChange={this.handlePriceChange}
                    />                    
                    {
                        this.renderHelpBlock()
                    }
                </FormGroup>
            </div>
        );
    }
}