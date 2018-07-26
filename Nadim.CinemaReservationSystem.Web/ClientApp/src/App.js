import React, { Component } from 'react';
import { Route } from 'react-router';
import Authentication from './components/Authentication'
import AddCinema from './components/AddCinema'

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
            <div>
                <p>{this.state.username} {this.state.token}</p>
                <Authentication 
                    username={this.state.username}
                    callBackSetUserInfo={this.setUserInfo}
                />
                <AddCinema 
                    username={this.state.username}
                    token={this.state.token}
                />
            </div>
        );
    }
}
