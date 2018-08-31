import React, { Component } from 'react';
import FormSession from './FormSession';
import SessionService from '../../Services/SessionService';
import ApplicationService from '../../Services/ApplicationService';
import DisplaySessionList from './DisplaySessionList';

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
    
    cancelCurrentOperation = () =>{
        this.setState({
            chosenOperation: ''
        });
    }

    handleChooseCreateCinemaOpeation = () =>{
        this.setState({
            chosenOperation: 'createSession',
        });
    }

    getSessionList = () =>{
        SessionService.getSessionList()
        .then(requestedData => {
            this.setState({
                sessionList: requestedData,
            });
        })
        .catch(error => ApplicationService.informWithErrorMessage(error));
    }

    createSession = (sessionInfoForCreation) =>{
        this.setState({
            chosenOperation: ''
        });
        SessionService.createSession(sessionInfoForCreation)
        .then(sessionInfo => {
            this.setState({
                sessionList: this.state.sessionList.concat(
                    sessionInfo
                )
            });
            ApplicationService.informWithMessage('Session created.');
        })
        .catch(error => ApplicationService.informWithErrorMessage(error));
    }

    getSession = (sessionId) =>{
        this.setState({
            chosenOperation: 'editSessionLoading'
        });
        SessionService.getSession(sessionId)
        .then(requestedData => {
            this.setState({
                chosenSessionInfo: requestedData,
                chosenOperation: 'editSession'
            })
        })
        .catch(error => {
            this.setState({
                chosenOperation: ''
            });
            ApplicationService.informWithErrorMessage(error);
        });
    }

    editSession = (sessionInfo) =>{
        this.setState({
            chosenOperation: ''
        });
        SessionService.editSession(this.state.chosenSessionInfo.sessionId, sessionInfo)
        .then(() => {
            this.setState({
                sessionList: SessionService.updateSessionList(
                    this.state.sessionList,
                    this.state.chosenSessionInfo.sessionId,
                    sessionInfo
                )
            });
            ApplicationService.informWithMessage('Session edited.');
        })
        .catch(error => ApplicationService.informWithErrorMessage(error));
    }

    renderSessionList = () =>{
        return(
            <React.Fragment>
                <h1>Session list</h1>
                <DisplaySessionList
                    list={this.state.sessionList}
                    handleElementClick={this.getSession}
                    handleListButtonClick={this.handleChooseCreateCinemaOpeation}
                />
            </React.Fragment>
        );
    }

    renderContent = () =>{
        switch(this.state.chosenOperation){
            case 'createSession':
                return( 
                    <FormSession
                        callBackInformWithMessage={this.props.callBackInformWithMessage}
                        token={this.props.token}
                        callBackReceiveSessionInfo={this.createSession}
                        callBackCancel={this.cancelCurrentOperation}
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
                        callBackInformWithMessage={this.props.callBackInformWithMessage}
                        sessionInfo={this.state.chosenSessionInfo}
                        token={this.props.token}
                        callBackReceiveSessionInfo={this.editSession}
                        callBackCancel={this.cancelCurrentOperation}
                    />
                );
            default:
                return this.renderSessionList();
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