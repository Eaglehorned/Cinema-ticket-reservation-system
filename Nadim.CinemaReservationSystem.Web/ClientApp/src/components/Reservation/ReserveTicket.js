import React, { Component } from 'react';
import ChooseSeats from './ChooseSeats';
import ConfirmReservation from './ConfirmReservation';
import SessionService from '../../Services/SessionService';
import ApplicationService from '../../Services/ApplicationService';
import ReservationServise from '../../Services/ReservationService';

export default class ReserveTicket extends Component{
    displayName = ReserveTicket.displayName;

    constructor(props){
        super(props);
        this.state={
            seatsChosen: false,
            seats: this.props.session.seats,
            chosenSeats: [],
            lastTimeUpdated: new Date()
        }
    }

    createOrder = () =>{
        ReservationServise.createOrder(
                this.props.userId,
                this.props.session.info.sessionId,
                this.state.chosenSeats
        )
        .then(() => {
            ApplicationService.informWithMessage('You have successfully booked seats.')
        })
        .catch(error => ApplicationService.informWithErrorMessage(error));
    }

    getUpdates = () =>{
        SessionService.getSessionSeatsUpdates(this.props.session.info.sessionId, this.state.lastTimeUpdated)
        .then(sessionSeatsUpdates =>{
            this.setState({
                seats: SessionService.updateSessionSeats(
                    this.state.seats,
                    this.state.chosenSeats,
                    sessionSeatsUpdates
                ),
                chosenSeats: SessionService.updateChosenSessionSeats(
                    this.state.chosenSeats,
                    sessionSeatsUpdates
                ),
                lastTimeUpdated: new Date()
            })
        })
        .catch(error => ApplicationService.informWithErrorMessage(error));
    }

    handleSeatClickFetch = (seatInfo) =>{
        return SessionService.editSessionSeat(this.props.session.info.sessionId, seatInfo.sessionSeatId, seatInfo.booked)
        .then(() =>{
            this.setState({
                seats: SessionService.updateSessionSeatInSeatsArray(seatInfo, this.state.seats),
                chosenSeats: SessionService.updateSessionSeatInChosenSeatsArray(seatInfo, this.state.chosenSeats)
            });
        })
        .catch(error => ApplicationService.informWithErrorMessage(error));
    }

    handleSeatClick = (seatInfo) =>{
        if(!this.state.seats[seatInfo.row][seatInfo.column].booked){
            if(!this.state.chosenSeats.find(el => el.sessionSeatId === seatInfo.sessionSeatId)){
                if(this.state.chosenSeats.length < 10){
                    this.handleSeatClickFetch(SessionService.formSeatInfo(seatInfo))        
                    .then(this.getUpdates);
                }
            }
            else{
                this.handleSeatClickFetch(SessionService.formSeatInfo(seatInfo))
                .then(this.getUpdates);
            }
        }
    }

    cancelReservation = () =>{
        this.state.chosenSeats.forEach(el=>{
            this.handleSeatClick(this.state.seats[el.row][el.column]);
        });
        this.props.callBackCancelParentOperation();
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
        this.createOrder();
        this.props.callBackCancelParentOperation();
    }

    renderChooseSeatsContent(){
        return(
            <ChooseSeats
                seats={this.state.seats}
                chosenSeats={this.state.chosenSeats}
                sessionSeatTypePrices={this.props.session.info.sessionSeatTypePrices}
                callBackHandleSeatClick={this.handleSeatClick}
                callBackHandleSeatsChoice={this.handleSeatsChoice}
                callBackCancelReservation={this.cancelReservation}
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
                        {new Date(this.props.session.info.beginTime).toLocaleString()}
                    </div>
                </div>
                {content}
            </div>
        );
    }
}