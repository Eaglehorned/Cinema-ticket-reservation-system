import React, { Component } from 'react';
import Modal from 'react-modal';

export default class SeatBoxForCreation extends Component{
    displayName = SeatBoxForCreation.displayName;

    constructor(props){
        super(props);
        this.state={
            seatType:'',
            modalIsopen:false,
        }
        this.closeModal= this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleOnSeatClick= this.handleOnSeatClick.bind(this);
    }

    closeModal(){
        this.setState({
            modalIsopen: false
        })
    }

    openModal(){
        this.setState({
            modalIsopen: true
        })
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