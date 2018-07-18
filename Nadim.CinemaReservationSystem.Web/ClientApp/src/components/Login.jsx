import React, { Component } from 'react';
import '../styles/Authentication.css';

export default class Login extends Component {
    displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:''
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleChangeEmail(event){
        this.setState({
            email: event.target.value
        })
    }

    handleChangePassword(event){
        this.setState({
            password: event.target.value
        });
        console.log(this.state.password);
    }

    handleLoginClick(event){
        event.preventDefault();
    }

    render() {
        return (
            <div className="authentication-container">
                <input type="email" className="form-control form-control-sm" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Example@example.com"/>
                <input type="password" className="form-control form-control-sm" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password"/>
                <button type="button" className="btn btn-primary btn-sm" onClick={this.handleLoginClick}>Log in</button>
            </div>
        )
    }
}