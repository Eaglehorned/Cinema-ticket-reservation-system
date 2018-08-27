import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ReserveTicket from './ReserveTicket';
import DisplaySessions from './DisplaySessions';
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
        fetch(`api/sessions/${sessionId}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
        })
        .then(response => {
            if (response.ok){
                return response.json();
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
        .then(parsedJson => {
            let tempSession = this.state.session;
            tempSession.info = parsedJson.requestedData;
            tempSession.info.beginTime = new Date(tempSession.info.beginTime);
            this.setState({
                session : tempSession
            })
        })
        .then( () =>{
            this.getSessionSeats(sessionId);
        })
        .catch(error => {
            this.setState({
                chosenOperation: ''
            });
            this.props.callBackInformWithMessage({ 
                text: error.message,
                isError: true
            });
        });
    }

    getSessionSeats = (sessionId) =>{
        fetch(`api/sessions/${sessionId}/seats`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
        })
        .then(response => {
            if (response.ok){
                return response.json();
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
        .then(parsedJson => {
            let tempSession = this.state.session;
            tempSession.seats = parsedJson.requestedData;

            tempSession.seats.sort((a, b) => {
                if (a.row === b.row){
                    if (a.column > b.column){
                        return 1;
                    }
                    if (a.column < b.column){
                        return -1;
                    } 
                    return 0;
                }
                if (a.row > b.row){
                    return 1;
                }
                return -1;
            });

            let rows = tempSession.seats[tempSession.seats.length - 1].row + 1;
            let columns = tempSession.seats[tempSession.seats.length - 1].column + 1;

            let seatsArray = [];
            for (let i = 0; i < rows; i++){
                seatsArray[i] = [];
                for (let j = 0; j < columns; j++) {
                    seatsArray[i].push(tempSession.seats[i * columns + j]);
                }
            }

            tempSession.seats = seatsArray;

            this.setState({
                session : tempSession,
                chosenOperation: 'reservation'
            })
        })
        .catch(error => {
            this.setState({
                chosenOperation: ''
            });
            this.props.callBackInformWithMessage({ 
                text: error.message,
                isError: true
            });
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
                        callBackCancelReservation={this.handleCancelOperation}
                        userId={this.props.userId}
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