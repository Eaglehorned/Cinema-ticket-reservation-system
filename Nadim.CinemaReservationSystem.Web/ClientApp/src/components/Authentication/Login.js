import React, { Component } from 'react';

export default class Login extends Component {
    displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            username:'',
            token:'',
            error:''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    validateEmail(email) {
        const result = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
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
        });
    }

    handleLoginClick(event){
        this.setState({
            error:'',
        })
        event.preventDefault();
        fetch('api/Authentication/Login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: this.state.email,
                Password: this.state.password,
            })
        }).then(response => response.json())
            .then(parsedJson => {
                if (parsedJson.resultOk === true) {
                    localStorage.setItem('token', parsedJson.token);
                    localStorage.setItem('username', parsedJson.fullUserName);
                    this.props.callBackFromParent({
                        username: parsedJson.fullUserName,
                        token: parsedJson.token
                    })
                    this.setState({
                        error:'',
                    })
                }
                else{
                   this.setState({
                       error: parsedJson.details,
                   });
                }
            });
    }

    render() {
        return (
            <fieldset>
                <input 
                    type="email" 
                    className="form-control form-control-sm" 
                    value={this.state.email} 
                    onChange={this.handleEmailChange} 
                    placeholder="Example@example.com"
                />
                <input 
                    type="password" 
                    className="form-control form-control-sm" 
                    value={this.state.password} 
                    onChange={this.handlePasswordChange} 
                    placeholder="Password"
                />
                <h4 className="error-text">{this.state.error}</h4>
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={this.handleLoginClick} 
                    disabled={!(this.validateEmail(this.state.email) && this.state.password)}
                >
                    Log in
                </button>
            </fieldset>
        )
    }
}