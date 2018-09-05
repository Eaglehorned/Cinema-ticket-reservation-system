import React, { Component } from 'react';
import FormSession from './FormSession';
import sessionService from '../../Services/SessionService';
import applicationService from '../../Services/ApplicationService';
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
        sessionService.getSessionList()
        .then(requestedData => {
            this.setState({
                sessionList: requestedData,
            });
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    createSession = (sessionInfoForCreation) =>{
        this.setState({
            chosenOperation: ''
        });
        sessionService.createSession(sessionInfoForCreation)
        .then(sessionInfo => {
            this.setState({
                sessionList: this.state.sessionList.concat(
                    sessionInfo
                )
            });
            applicationService.informWithMessage('Session created.');
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    getSession = (sessionId) =>{
        this.setState({
            chosenOperation: 'editSessionLoading'
        });
        sessionService.getSession(sessionId)
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
            applicationService.informWithErrorMessage(error);
        });
    }

    editSession = (sessionInfo) =>{
        this.setState({
            chosenOperation: ''
        });
        sessionService.editSession(this.state.chosenSessionInfo.sessionId, sessionInfo)
        .then(() => {
            this.setState({
                sessionList: sessionService.updateSessionList(
                    this.state.sessionList,
                    this.state.chosenSessionInfo.sessionId,
                    sessionInfo
                )
            });
            applicationService.informWithMessage('Session edited.');
        })
        .catch(error => applicationService.informWithErrorMessage(error));
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