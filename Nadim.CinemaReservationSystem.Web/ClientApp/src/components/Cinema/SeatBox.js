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
        let styleName;
        if(this.props.seatInfo.chosen){
            styleName = `${this.props.seatInfo.type}-chosen`
        }
        else if(this.props.seatInfo.booked){
            styleName = 'booked';
        }
        else{
            styleName = this.props.seatInfo.type;
        }
        return(
            <div 
                className={`seat-${styleName}`} 
                onClick={this.handleOnSeatClick}
            />
            //</div>
        );
    }
}