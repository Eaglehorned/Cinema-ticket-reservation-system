import React, { Component } from 'react';
import '../styles/Authentication.css';

export default class Login extends Component {
    displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            username:'',
            token:'',
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    validateEmail(email) {
        let result = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return result.test(String(email).toLowerCase());
    }

    handleEmailChange(event){
        this.setState({
            email: event.target.value,
        })
    }

    handlePasswordChange(event){
        this.setState({
            password: event.target.value,
        });
    }

    handleLoginClick(event){
        event.preventDefault();
        fetch('api/Authentication/Login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: 0,
                Email: this.state.email,
                Password: this.state.password,
            })
        }).then(response => response.json())
            .then(parsedJson => {
                console.log(parsedJson);
                if (parsedJson.status === 'ok') {
                    localStorage.setItem('token', parsedJson.token);
                    localStorage.setItem('username', parsedJson.details);
                    //here to call callback
                }
                else{
                    alert(parsedJson.details);
                }
            });
    }

    render() {
        return (
            <div className="authentication-container">
                <input type="email" className="form-control form-control-sm" value={this.state.email} onChange={this.handleEmailChange} placeholder="Example@example.com"/>
                <input type="password" className="form-control form-control-sm" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
                <button type="button" className="btn btn-primary btn-sm" onClick={this.handleLoginClick} disabled={!(this.validateEmail(this.state.email) && this.state.password)}>Log in</button>
            </div>
        )
    }
}