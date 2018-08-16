import React, { Component } from 'react';
import FormSession from './FormSession';
import { Button } from 'react-bootstrap';
import SessionDisplayInfoBox from './SessionDisplayInfoBox';

export default class Session extends Component{
    displayName = Session.displayName;
    constructor(props){
        super(props);
        this.state={
            chosenOperation: '',
            sessionList: [],
            chosenSessionInfo: undefined,
        }

        this.getSessionList();
    }

    informWithMessage = (message) => {
        this.props.callBackInformWithMessage(message);
    }

    getSessionList = () =>{
        fetch('api/sessions', {
            method: 'GET',
            headers:{
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
            this.setState({
                sessionList: parsedJson.requestedData,
            });
        })
        .catch(error => this.informWithMessage(
            { 
                text: error.message,
                isError: true
            })
        );
    }

    createSession = (receivedSessionInfo) =>{
        this.setState({
            chosenOperation: ''
        })
        fetch('api/sessions', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify({
                cinemaRoomId: receivedSessionInfo.cinemaRoom.cinemaRoomId,
                filmId: receivedSessionInfo.film.filmId,
                beginTime: receivedSessionInfo.beginTime,
                sessionSeatTypePrices: receivedSessionInfo.sessionSeatTypePrices
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
            this.setState({
                sessionList: this.state.sessionList.concat({
                    cinemaName: receivedSessionInfo.cinema.name,
                    cinemaCity: receivedSessionInfo.cinema.city,
                    cinemaRoomName: receivedSessionInfo.cinemaRoom.name,
                    filmName: receivedSessionInfo.film.name,
                    beginTime: receivedSessionInfo.beginTime,
                    sessionId: response.headers.get('location').substring(response.headers.get('location').lastIndexOf('/') + 1, response.headers.get('location').length)
                })
            });
            this.informWithMessage('Session created.');
        })
        .catch(error => {
            this.informWithMessage(
            { 
                text: error.message,
                isError: true
            });
        });
    }

    getSession = (sessionId) =>{
        this.setState({
            chosenOperation: 'editSessionLoading'
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
            this.setState({
                chosenSessionInfo: parsedJson.requestedData,
                chosenOperation: 'editSession'
            })
        })
        .catch(error => {
            this.setState({
                chosenOperation: ''
            });
            this.informWithMessage({ 
                text: error.message,
                isError: true
            });
        });
    }

    editSession = (receivedSessionInfo) =>{
        this.setState({
            chosenOperation: ''
        })
        fetch(`api/sessions/${this.state.chosenSessionInfo.sessionId}`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify({
                cinemaRoomId: receivedSessionInfo.cinemaRoom.cinemaRoomId,
                filmId: receivedSessionInfo.film.filmId,
                beginTime: receivedSessionInfo.beginTime,
                sessionSeatTypePrices: receivedSessionInfo.sessionSeatTypePrices
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
            let tempSessionList = this.state.sessionList;
            tempSessionList.find( el => el.sessionId === this.state.chosenSessionInfo.sessionId).cinemaName = receivedSessionInfo.cinema.name;
            tempSessionList.find( el => el.sessionId === this.state.chosenSessionInfo.sessionId).cinemaCity = receivedSessionInfo.cinema.city;
            tempSessionList.find( el => el.sessionId === this.state.chosenSessionInfo.sessionId).cinemaRoomName = receivedSessionInfo.cinemaRoom.name;
            tempSessionList.find( el => el.sessionId === this.state.chosenSessionInfo.sessionId).filmName = receivedSessionInfo.film.name;
            tempSessionList.find( el => el.sessionId === this.state.chosenSessionInfo.sessionId).beginTime = receivedSessionInfo.beginTime;
            this.setState({
                sessionList: tempSessionList
            });
            this.informWithMessage('Session edited.');
        })
        .catch(error => {
            this.informWithMessage(
            { 
                text: error.message,
                isError: true
            });
        });
    }

    renderActionsContent(){
        return(
            <React.Fragment>
                <h1>Session list</h1>
                <div className="list-container">
                    {
                        this.state.sessionList.map((el)=>
                            <SessionDisplayInfoBox
                                key={el.sessionId}
                                sessionInfo={el}
                                callBackEditSession={this.getSession}
                            />
                        )
                    }
                <Button
                    bsStyle="primary"
                    onClick={ () => this.setState({ chosenOperation: 'createSession' })}
                >
                    Create session
                </Button>
                </div>
            </React.Fragment>
        );
    }

    renderContent = () =>{
        switch(this.state.chosenOperation){
            case 'createSession':
                return( 
                    <FormSession
                        callBackInformWithMessage={this.informWithMessage}
                        token={this.props.token}
                        callBackReceiveSessionInfo={this.createSession}
                    />
                );
            case 'editSessionLoading': 
                return(
                    <div className="font-x-large font-italic">
                        Loading...
                    </div>
                );
            case 'editSession': 
                return(
                    <FormSession
                        callBackInformWithMessage={this.informWithMessage}
                        sessionInfo={this.state.chosenSessionInfo}
                        token={this.props.token}
                        callBackReceiveSessionInfo={this.editSession}
                    />
                );
            default:    
                return this.renderActionsContent();
        }
    }

    render(){
        let content = this.renderContent();
        return(
            <div className="content-container">
                <div className="well">
                    {content}
                </div>
            </div>
        );
    }
}