import React, { Component } from 'react';
import TokenService from './Services/TokenService';
import ApplicationService from './Services/ApplicationService';
import Header from './components/Header';
import Body from './components/Body';
import MyAlert from './components/MyAlert';

export default class App extends Component {
    displayName = App.name

    constructor(){
        super();
        this.state={
            username: localStorage.getItem('username'),
            role: localStorage.getItem('role'),
            shownRole: localStorage.getItem('role'),
            userId: localStorage.getItem('userId'),
            show: false,
            infoMessage:'',
            alertStyle:'info'
        }
        TokenService.setToken(localStorage.getItem('token'));
        ApplicationService.setInformWithMessage(this.informWithMessage);
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
            role: userInfo.role,
            userId: userInfo.userId,
            shownRole: userInfo.role
        });
    }

    renderAlertMessage = () =>{
        return(
            <MyAlert
                alertStyle={this.state.alertStyle}
                infoMessage={this.state.infoMessage}
                callbackOnDismiss={() => this.setState({show: false})}
            />
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
                    token={TokenService.getToken()}
                    callBackInformWithMessage={this.informWithMessage}
                    userId={this.state.userId}
                />
            </React.Fragment>
        );
    }
}
