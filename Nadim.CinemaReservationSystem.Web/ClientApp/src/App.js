import React, { Component } from 'react';
import Header from './components/Header';
import Body from './components/Body';

export default class App extends Component {
    displayName = App.name

    constructor(){
        super();
        this.state={
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token'),
        }
        this.setUserInfo = this.setUserInfo.bind(this);
    }

    setUserInfo(userInfo){
        this.setState({
            username: userInfo.username,
            token: userInfo.token,
        })
    }

    render() {
        return (
            <React.Fragment>
                <Header
                    username={this.state.username}
                    callBackSetUserInfo={this.setUserInfo}
                />
                <Body
                    token={this.state.token}
                />
            </React.Fragment>
        );
    }
}
