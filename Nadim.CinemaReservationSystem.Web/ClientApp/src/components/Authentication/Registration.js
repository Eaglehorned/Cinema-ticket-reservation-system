import React, { Component } from 'react';

export default class Registration extends Component {
    displayName = Registration.name;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            error:'',
            userName:'',
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    validateEmail(email) {
        let result = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return result.test(String(email).toLowerCase());
    }

    handleEmailChange(event){
        this.setState({
            email: event.target.value,
            error:'',
        })
    }

    handlePasswordChange(event){
        this.setState({
            password: event.target.value,
            error:'',
        })
    }

    handleFirstnameChange(event){
        this.setState({
            firstName: event.target.value,
            error:'',
        })
    }

    handleLastnameChange(event){
        this.setState({
            lastName: event.target.value,
            error:'',
        })
    }

    handleUsernameChange(event){
        this.setState({
            userName: event.target.value,
            error:'',
        })
    }

    handleRegisterClick(event){
        event.preventDefault();
        fetch('api/Authentication/Register', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: this.state.email,
                Password: this.state.password,
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                Username: this.state.userName,
            })
        }).then(response => response.json())
            .then(parsedJson => {
                if (parsedJson.resultOk === true) {
                    localStorage.setItem('token', parsedJson.token);
                    localStorage.setItem('username', this.state.userName);
                    this.props.callBackFromParent({
                        username: this.state.userName,
                        token: parsedJson.token
                    });
                    this.setState({
                        error:''
                    })
                }
                else {
                    this.setState({
                        error: parsedJson.details,
                    })
                }
            })
    }

    render() {
        return (
            <fieldset className="authentication-container">
                <h3 className="error-text">{this.state.error}</h3>
                <input 
                    type="email" 
                    className="form-control form-control-sm" 
                    placeholder="Example@example.com" 
                    onChange={this.handleEmailChange}
                />
                <input 
                    type="password" 
                    className="form-control form-control-sm" 
                    placeholder="Password" 
                    onChange={this.handlePasswordChange}
                />
                <input 
                    type="name" 
                    className="form-control form-control-sm" 
                    placeholder="User name" 
                    onChange={this.handleUsernameChange}
                />
                <input 
                    type="name" 
                    className="form-control form-control-sm" 
                    placeholder="First name" 
                    onChange={this.handleFirstnameChange}
                />
                <input 
                    type="name" 
                    className="form-control form-control-sm" 
                    placeholder="Last name" 
                    onChange={this.handleLastnameChange}
                />
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={this.handleRegisterClick} 
                    disabled={!(this.validateEmail(this.state.email) && this.state.password && this.state.lastName && this.state.firstName)}
                >
                    Register
                </button>
            </fieldset>
        ); 
    }
}