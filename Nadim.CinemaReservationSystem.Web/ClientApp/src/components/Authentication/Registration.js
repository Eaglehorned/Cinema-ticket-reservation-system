import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import AuthenticationService from '../../Services/AuthenticationService';

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
    }

    handleEmailChange = (event) =>{
        this.setState({
            email: event.target.value,
            error:'',
        })
    }

    handlePasswordChange = (event) =>{
        this.setState({
            password: event.target.value,
            error:'',
        })
    }

    handleFirstnameChange = (event) =>{
        this.setState({
            firstName: event.target.value,
            error:'',
        })
    }

    handleLastnameChange = (event) =>{
        this.setState({
            lastName: event.target.value,
            error:'',
        })
    }

    handleUsernameChange = (event) =>{
        this.setState({
            userName: event.target.value,
            error:'',
        })
    }

    handleRegisterClick = () =>{
        AuthenticationService.registerUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
        })
        .then(() =>
            this.props.callBackFromParent()
        )
        .catch(error =>{
            this.setState({
                error: error.message,
            })
        });
    }

    render(){
        return(
            <fieldset className="authentication-container">
                <h3 className="error-text">{this.state.error}</h3>
                <FormControl 
                    type="email" 
                    placeholder="Example@example.com" 
                    onChange={this.handleEmailChange}
                />
                <FormControl 
                    type="password" 
                    placeholder="Password" 
                    onChange={this.handlePasswordChange}
                />
                <FormControl 
                    type="name" 
                    placeholder="User name" 
                    onChange={this.handleUsernameChange}
                />
                <FormControl 
                    type="name" 
                    placeholder="First name" 
                    onChange={this.handleFirstnameChange}
                />
                <FormControl 
                    type="name" 
                    placeholder="Last name" 
                    onChange={this.handleLastnameChange}
                />
                <Button
                    bsStyle="primary"
                    onClick={this.handleRegisterClick} 
                    disabled={!AuthenticationService.allowRegisterClick(
                        this.state.email,
                        this.state.password,
                        this.state.lastName,
                        this.state.firstName
                    )}
                >
                    Register
                </Button>
            </fieldset>
        ); 
    }
}