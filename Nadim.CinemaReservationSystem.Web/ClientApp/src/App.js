import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import Header from './components/Header';
import Body from './components/Body';

export default class App extends Component {
    displayName = App.name

    constructor(){
        super();
        this.state={
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
            role: localStorage.getItem('role'),
            shownRole: localStorage.getItem('role'),
            userId: localStorage.getItem('userId'),
            show: false,
            infoMessage:'',
            alertStyle:'info'
        }
    }

    setShownRole = (role) =>{
        this.setState({
            shownRole: role
        })
    }

    informWithMessage = (message) =>{
        if (message.isError){
            this.setState({
                show: true,
                infoMessage: message.text,
                alertStyle: 'danger'
            });
        }
        else {
            this.setState({
                show: true,
                infoMessage: message,
                alertStyle: 'success'
            });
        }
        const self = this;
        setTimeout(() => 
            self.setState({
                show: false,
                infoMessage:''
            }),4000);
    }

    setUserInfo = (userInfo) =>{
        this.setState({
            username: userInfo.username,
            token: userInfo.token,
            role: userInfo.role,
            userId: userInfo.userId,
            shownRole: userInfo.role
        })
    }

    renderAlertMessage = () =>{
        return(
            <Alert
                bsStyle={`${this.state.alertStyle} alert-bottom`}
                onDismiss={() => this.setState({show: false})}
            >
                <div className="font-bold-x-large">
                {
                    this.state.alertStyle === 'danger'
                    ? 'Error'
                    : 'Success'
                }
                </div>
                <div className="font-large">
                    {this.state.infoMessage}
                </div>

            </Alert>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="font-x-large">
                    {this.state.show ? 
                        this.renderAlertMessage() :
                        ''
                    }
                </div>
                <Header
                    username={this.state.username}
                    role={this.state.role}
                    callBackSetUserInfo={this.setUserInfo}
                    callBackSetShownRole={this.setShownRole}
                />
                <Body
                    role={this.state.shownRole}
                    token={this.state.token}
                    callBackInformWithMessage={this.informWithMessage}
                    userId={this.state.userId}
                />
            </React.Fragment>
        );
    }
}
