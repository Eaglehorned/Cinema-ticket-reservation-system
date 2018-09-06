import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ReserveTicket from './ReserveTicket';
import DisplaySessions from './DisplaySessions';
import sessionService from '../../Services/SessionService';
import applicationService from '../../Services/ApplicationService';
import '../../styles/Reservation.css';

export default class Reservation extends Component{
    displayName = Reservation.displayName;

    constructor(props){
        super(props);
        this.state={
            sessionList: [],
            chosenOperation: '',
            session: {}
        }
    }

    getSession = (sessionId) =>{
        this.setState({
            chosenOperation: 'reservationLoading'
        });
        sessionService.getSession(sessionId)
        .then(requestedData =>{
            this.setState({
                session : sessionService.completeSessionWithInfo(this.state.session, requestedData)
            });
            return sessionId;
        })
        .then(this.getSessionSeats)
        .catch(error => {
            this.setState({
                chosenOperation: ''
            });
            applicationService.informWithErrorMessage(error);
        });
    }

    getSessionSeats = (sessionId) =>{
        sessionService.getSessionSeats(sessionId)
        .then(requestedData =>{
            this.setState({
                session : sessionService.completeSessionWithSeats(this.state.session, requestedData),
                chosenOperation: 'reservation'
            })
        });
    }

    handleReceiveSessionList = (receivedSessionList) =>{
        this.setState({
            sessionList: receivedSessionList
        })
    }

    handleReserveTicketClick = (sessionId) =>{
        this.getSession(sessionId);
    }

    handleCancelOperation = () =>{
        this.setState({
            chosenOperation: ''
        });
    }

    renderSessionListContent = () =>{
        return(
            <React.Fragment>
                <h1>Sessions</h1>
                    <SearchBar
                        token={this.props.token}
                        callBackReceiveSessionList={this.handleReceiveSessionList}
                        callBackInformWithMessage={this.props.callBackInformWithMessage}
                    />
                    <div className="list-container">
                        <DisplaySessions
                            sessions={this.state.sessionList}
                            callBackHandleSessionAction={this.handleReserveTicketClick}
                        />
                    </div>
            </React.Fragment>
        );
    }

    renderContent = () =>{
        switch(this.state.chosenOperation){
            case 'reservation':
                return(
                    <ReserveTicket
                        token={this.props.token}
                        callBackInformWithMessage={this.props.callBackInformWithMessage}
                        session={this.state.session}
                        callBackCancelParentOperation={this.handleCancelOperation}
                    />
                );
            case 'reservationLoading':
                return(
                    <div className="font-x-large font-italic">
                        Loading...
                    </div>
                );
            default:
                return this.renderSessionListContent();
        }
    }

    render(){
        const content = this.renderContent();
        return(
            <div className="content-container">
                <div className="well">
                    {content}
                </div>
            </div>
        );
    }
}