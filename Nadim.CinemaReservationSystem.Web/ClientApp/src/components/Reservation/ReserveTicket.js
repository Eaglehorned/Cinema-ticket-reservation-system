import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ChooseSeats from './ChooseSeats';
import ConfirmReservation from './ConfirmReservation';
import sessionService from '../../Services/SessionService';
import applicationService from '../../Services/ApplicationService';
import reservationServise from '../../Services/ReservationService';
import Loading from '../General/Loading';

class ReserveTicket extends Component{
    displayName = ReserveTicket.displayName;

    constructor(props){
        super(props);
        this.state={
            seatsChosen: false,
            seats: [],
            chosenSeats: [],
            lastTimeUpdated: new Date(),
            session: {},
            dataIsLoaded: false
        }
    }

    componentWillMount = () =>{
        this.getSession(this.props.match.params.id)
        .then(() => { this.setState({dataIsLoaded: true}) })
        .catch(error => {
            applicationService.informWithErrorMessage(error)
            this.props.callBackReturnToUpperPage();
        });
    }

    getSession = (sessionId) =>{
        return sessionService.getSession(sessionId)
        .then(requestedData =>{
            this.setState({
                session : sessionService.addInfoToSession(this.state.session, requestedData)
            });
            return sessionId;
        })
        .then(this.getSessionSeats);
    }

    getSessionSeats = (sessionId) =>{
        return sessionService.getSessionSeats(sessionId)
        .then(requestedData =>{
            this.setState({
                seats: requestedData,
                session : sessionService.addSeatsToSession(this.state.session, requestedData)
            })
        });
    }

    createOrder = () =>{
        reservationServise.createOrder(
                this.state.session.info.sessionId,
                this.state.chosenSeats
        )
        .then(() => {
            applicationService.informWithMessage('You have successfully booked seats.')
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    getUpdates = () =>{
        sessionService.getSessionSeatsUpdates(
            this.state.session.info.sessionId, 
            this.state.lastTimeUpdated)
        .then(sessionSeatsUpdates =>{
            this.setState({
                seats: sessionService.updateSessionSeats(
                    this.state.seats,
                    this.state.chosenSeats,
                    sessionSeatsUpdates
                ),
                chosenSeats: sessionService.updateChosenSessionSeats(
                    this.state.chosenSeats,
                    sessionSeatsUpdates
                ),
                lastTimeUpdated: new Date()
            })
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    editSessionSeat = (seatInfo) =>{
        return sessionService.editSessionSeat(
            this.state.session.info.sessionId, 
            seatInfo.sessionSeatId, 
            seatInfo.booked
        )
        .then(() =>{
            this.setState({
                seats: sessionService.updateSessionSeatInSeatsArray(seatInfo, this.state.seats),
                chosenSeats: sessionService.updateSessionSeatInChosenSeatsArray(seatInfo, this.state.chosenSeats)
            });
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    changeSeat = (seatInfo) =>{
        if(!this.state.seats[seatInfo.row][seatInfo.column].booked){
            if(!this.state.chosenSeats.find(el => el.sessionSeatId === seatInfo.sessionSeatId)){
                if(this.state.chosenSeats.length < 10){
                    return this.editSessionSeat(sessionService.formSeatInfo(seatInfo));
                }
            }
            else{
                return this.editSessionSeat(sessionService.formSeatInfo(seatInfo));
            }
        }
    }

    handleSeatClick = (seatInfo) =>{
        this.changeSeat(seatInfo)
        .then(this.getUpdates);
    }

    cancelReservation = () =>{
        this.state.chosenSeats.forEach(el=>{
            sessionService.editSessionSeat(
                this.state.session.info.sessionId, 
                this.state.seats[el.row][el.column].sessionSeatId,
                false
            );
        });
        this.props.callBackReturnToUpperPage();
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
        this.props.callBackReturnToUpperPage();
    }

    renderChooseSeatsContent(){
        return(
            <ChooseSeats
                seats={this.state.seats}
                chosenSeats={this.state.chosenSeats}
                sessionSeatTypePrices={this.state.session.info.sessionSeatTypePrices}
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
                sessionSeatTypePrices={this.state.session.info.sessionSeatTypePrices}
                callBackCancelConfirm={this.handleCancelConfirm}
                callBackConfirmReservation={this.handleConfirmReservation}
            />
        );
    }
    
    renderReservationContent = () =>{
        if (!this.state.seatsChosen){
            return this.renderChooseSeatsContent();
        }
        else{
            return this.renderConfirmContent();
        }
    }

    renderInformation = () =>{
        return(
            <div className="inline-information-block">
                <div className="header-string-box">
                    {this.state.session.info.film.name}
                </div>
                <div className="information-block">
                    {this.state.session.info.cinema.city},{' '}
                    {this.state.session.info.cinema.name}
                </div>
                <div className="information-block">
                    {new Date(this.state.session.info.beginTime).toLocaleString()}
                </div>
            </div>
        );
    }

    renderContent = () =>{
        return(
            <React.Fragment>
                {this.renderInformation()}
                {this.renderReservationContent()}
            </React.Fragment>
        );
    }

    render(){
        const content = this.state.dataIsLoaded 
            ? this.renderContent() 
            : <Loading/>;
        return(
            <div>
                {content}
            </div>
        );
    }
}

export default withRouter(ReserveTicket);