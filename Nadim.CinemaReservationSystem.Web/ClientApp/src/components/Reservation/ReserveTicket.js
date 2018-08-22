import React, { Component } from 'react';
import ChooseSeats from './ChooseSeats';
import ConfirmReservation from './ConfirmReservation';
import moment from 'moment';

export default class ReserveTicket extends Component{
    displayName = ReserveTicket.displayName;

    constructor(props){
        super(props);
        this.state={
            seatsChosen: false,
            seats: this.props.session.seats,
            chosenSeats: [],
            reservationConfirmed: false,
            lastTimeUpdated: moment()
        }

        this.handleSeatClickFetch({
            sessionSeatId: 1,
            booked: true,
            lastTimeUpdated: this.state.lastTimeUpdated
        })
    }

    createOrder = () =>{
        fetch('api/orders/', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify({
                userId: this.props.userId,
                sessionId: this.props.session.info.sessionId
            })
        })
        .then(response => {
            if (response.ok){
                return response;
            }
            if (response.status === 400){
                return response.json().then((err) => {
                    throw new Error(`Bad request. ${err.details}`);
                });
            }
            if (response.status === 401){
                throw new Error('You need to authorize to do that action.');
            }
            if (response.status === 404){
                return response.json().then((err) => {
                    throw new Error(`Not found. ${err.details}`);
                });
            }
        })
        .then(response => {
            // this.setState({
            //     orderId: parseInt(response.headers.get('location').substring(response.headers.get('location').lastIndexOf('/') + 1, response.headers.get('location').length), 10) 
            // })
        })
        .catch(error => {
            this.props.callBackInformWithMessage(
            { 
                text: error.message,
                isError: true
            });
        });
    }

    componentWillUnmount(){
        if (this.state.reservationConfirmed){

        }
    }

    //TODO need to finish
    handleSeatClickFetch = (seatInfo) =>{
        fetch(`api/sessions/${this.props.session.info.sessionId}/seats/${seatInfo.sessionSeatId}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify({
                booked: seatInfo.booked,
                lastTimeUpdated: moment().format()
            })
        })
    }

    handleSeatClick = (seatInfo) =>{
        if(!this.state.seats[seatInfo.row][seatInfo.column].booked){
            if(!this.state.chosenSeats.find(el => el.sessionSeatId === seatInfo.sessionSeatId)){
                if(this.state.chosenSeats.length < 10){
                    let tempSeats = this.state.seats;
                    tempSeats[seatInfo.row][seatInfo.column].chosen = true;
                    this.setState({
                        seatInfo: tempSeats,
                        chosenSeats: this.state.chosenSeats.concat(tempSeats[seatInfo.row][seatInfo.column])
                    });
                }
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

    handleConfirmReservation = () =>{
        let self = this;
        let promise = new Promise((resolve, reject) => {
            self.setState({
               reservationConfirmed: true
            })
            resolve();
        });

        promise
            .then(
                result => self.props.callBackCancelReservation(),
                error => self.props.callBackInformWithMessage({
                    text: 'Unable to reserve',
                    isError: true
                })
            );
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
                callBackConfirmReservation={this.handleConfirmReservation}
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