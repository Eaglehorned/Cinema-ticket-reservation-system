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
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
    }

    handleEmailChange(event){
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        })
    }

    handleFirstnameChange(event){
        this.setState({
            firstName: event.target.value
        })
    }

    handleLastnameChange(event){
        this.setState({
            lastName: event.target.value
        })
    }

    handleRegisterClick(event){
        event.preventDefault();
        //request
    }

    render() {
        return (
            <div className="authentication-container">
                <input type="email" className="form-control form-control-sm" placeholder="Example@example.com" onChange={this.handleEmailChange}/>
                <input type="password" className="form-control form-control-sm" placeholder="Password" onChange={this.handlePasswordChange}/>
                <input type="name" className="form-control form-control-sm" placeholder="First name" onChange={this.handleFirstnameChange}/>
                <input type="name" className="form-control form-control-sm" placeholder="Last name" onChange={this.handleLastnameChange}/>
                <button type="button" class="btn btn-primary btn-sm" onClick={this.handleRegisterClick}>Register</button>
            </div>
        ); 
    }
}