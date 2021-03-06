import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FormSession from './FormSession';
import sessionService from '../../Services/SessionService';
import applicationService from '../../Services/ApplicationService';
import DisplaySessionList from './DisplaySessionList';

export default class Session extends Component{
    displayName = Session.displayName;
    constructor(props){
        super(props);
        this.state={
            sessionList: []
        }
        this.getSessionList();
    }
    
    returnToSessionPage = () =>{
        this.props.history.push(this.props.match.url);
    }

    handleChooseCreateSessionAction = () =>{
        this.props.history.push(`${this.props.match.url}/new`);
    }

    handleChooseEditSessionAction = (sessionId) =>{
        this.props.history.push(`${this.props.match.url}/${sessionId}`);
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
        this.returnToSessionPage();

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

    editSession = (sessionInfo) =>{
        this.returnToSessionPage();

        sessionService.editSession(sessionInfo)
        .then(() => {
            this.setState({
                sessionList: sessionService.updateSessionList(
                    this.state.sessionList,
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
                    handleElementClick={this.handleChooseEditSessionAction}
                    handleListButtonClick={this.handleChooseCreateSessionAction}
                />
            </React.Fragment>
        );
    }

    renderContent = () =>{
        return(
            <Switch>
                <Route exact path={`${this.props.match.url}/new`} render={() =>(
                    <FormSession
                        callBackReceiveSessionInfo={this.createSession}
                        callBackReturnToUpperPage={this.returnToSessionPage}
                    />
                )}/>
                <Route exact path={`${this.props.match.url}/:id`} render={() =>(
                    <FormSession
                        callBackReceiveSessionInfo={this.editSession}
                        callBackReturnToUpperPage={this.returnToSessionPage}
                    />
                )}/>
                <Route exact path={`${this.props.match.url}`} render={() =>
                    this.renderSessionList()
                }/>
            </Switch>
        );
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