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
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleEmailChange(event){
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        });
    }

    handleLoginClick(event){
        event.preventDefault();
        fetch('api/Authentication/Authenticate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: 0,
                Email: this.state.email,
                Password: this.state.password,
                FirstName: '',
                LastName: '',
                Role: ''
            })
        }).then(response => response.json())
            .then(parsedJson => {
                console.log(parsedJson);
            });
    }

    render() {
        return (
            <div className="authentication-container">
                <input type="email" className="form-control form-control-sm" value={this.state.email} onChange={this.handleEmailChange} placeholder="Example@example.com"/>
                <input type="password" className="form-control form-control-sm" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
                <button type="button" className="btn btn-primary btn-sm" onClick={this.handleLoginClick}>Log in</button>
            </div>
        )
    }
}