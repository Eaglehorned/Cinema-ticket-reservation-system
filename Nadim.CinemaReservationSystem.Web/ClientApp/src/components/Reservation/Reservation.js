import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
            session: {}
        }
    }

    handleReceiveSessionList = (receivedSessionList) =>{
        this.setState({
            sessionList: receivedSessionList
        })
    }

    handleReserveTicketClick = (sessionId) =>{
        this.props.history.push(`${this.props.match.url}session/${sessionId}`);
    }

    returnToMainPage = () =>{
        this.props.history.push(this.props.match.url);
    }

    renderSessionListContent = () =>{
        return(
            <React.Fragment>
                <h1>Sessions</h1>
                    <SearchBar
                        token={this.props.token}
                        callBackReceiveSessionList={this.handleReceiveSessionList}
                    />
                    <DisplaySessions
                        sessions={this.state.sessionList}
                        callBackHandleSessionAction={this.handleReserveTicketClick}
                    />
            </React.Fragment>
        );
    }

    renderContent = () =>{
        return(
            <Switch>
                <Route path={`${this.props.match.url}session/:id`} render={() => (
                    <ReserveTicket
                        callBackCancelParentOperation={this.returnToMainPage}
                    />                   
                )}/>
                <Route exact path={this.props.match.url} render={() => 
                    this.renderSessionListContent()
                }/>
            </Switch>
        );
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