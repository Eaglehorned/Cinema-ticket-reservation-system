import React, { Component } from 'react';
import ChooseSeats from './ChooseSeats';
import ConfirmReservation from './ConfirmReservation';

export default class ReserveTicket extends Component{
    displayName = ReserveTicket.displayName;

    constructor(props){
        super(props);
        this.state={
            seatsChosen: false,
            seats: this.props.session.seats,
            chosenSeats: []
        }
    }

    handleSeatClick = (seatInfo) =>{
        if(!this.state.seats[seatInfo.row][seatInfo.column].booked){
            if(!this.state.chosenSeats.find(el => el.sessionSeatId === seatInfo.sessionSeatId)){
                let tempSeats = this.state.seats;
                tempSeats[seatInfo.row][seatInfo.column].chosen = true;
                this.setState({
                    seatInfo: tempSeats,
                    chosenSeats: this.state.chosenSeats.concat(tempSeats[seatInfo.row][seatInfo.column])
                });
            }
            else{
                let tempSeats = this.state.seats;
                tempSeats[seatInfo.row][seatInfo.column].chosen = false;
                let tempChosenSeats = this.state.chosenSeats;
                tempChosenSeats.splice(tempChosenSeats.findIndex( el => el.sessionSeatId === seatInfo.sessionSeatId), 1);
                this.setState({
                    seatInfo: tempSeats,
                    chosenSeats: tempChosenSeats
                });
            }
        }
    }

    handleSeatsChoice = () =>{
        this.setState({
            seatsChosen: true
        })
    }

    handleCancelConfirm = () =>{
        this.setState({
            seatsChosen: false
        })
    }

    renderChooseSeatsContent(){
        return(
            <ChooseSeats
                seats={this.state.seats}
                chosenSeats={this.state.chosenSeats}
                sessionSeatTypePrices={this.props.session.info.sessionSeatTypePrices}
                callBackHandleSeatClick={this.handleSeatClick}
                callBackHandleSeatsChoice={this.handleSeatsChoice}
                callBackCancelReservation={this.props.callBackCancelReservation}
            />
        );
    }

    renderConfirmContent(){
        return(
            <ConfirmReservation
                chosenSeats={this.state.chosenSeats}
                sessionSeatTypePrices={this.props.session.info.sessionSeatTypePrices}
                callBackCancelConfirm={this.handleCancelConfirm}
            />
        );
    }
    
    renderContent = () =>{
        if (!this.state.seatsChosen){
            return this.renderChooseSeatsContent();
        }
        else{
            return this.renderConfirmContent();
        }
    }

    render(){
        const content = this.renderContent();
        return(
            <div>
                <div className="inline-information-block">
                    <div className="header-string-box">
                        {this.props.session.info.film.name}
                    </div>
                    <div className="information-block">
                        {this.props.session.info.cinema.city},{' '}
                        {this.props.session.info.cinema.name}
                    </div>
                    <div className="information-block">
                        {this.props.session.info.beginTime.toLocaleString()}
                    </div>
                </div>
                {content}
            </div>
        );
    }
}