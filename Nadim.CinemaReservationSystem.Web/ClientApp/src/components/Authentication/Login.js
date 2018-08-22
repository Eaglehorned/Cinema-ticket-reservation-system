import React, { Component } from 'react';
import { FormControl, FormGroup, Button } from 'react-bootstrap';

export default class Login extends Component {
    displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            username:'',
            error:''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    parseJwt(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    validateEmail(email) {
        const result = /^([\w-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
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
                    let role;
                    let userId;
                    for (let key in this.parseJwt(parsedJson.token)){
                        if (key.indexOf('role') !== -1){
                            role = this.parseJwt(parsedJson.token)[key];
                            continue;
                        }
                        if (key.indexOf('nameidentifier') !== -1){
                            userId = this.parseJwt(parsedJson.token)[key];
                            continue;
                        }
                    }
                    localStorage.setItem('token', parsedJson.token);
                    localStorage.setItem('username', parsedJson.fullUserName);
                    localStorage.setItem('role', role);
                    localStorage.setItem('userId', userId);
                    this.props.callBackFromParent({
                        username: parsedJson.fullUserName,
                        token: parsedJson.token,
                        role: role,
                        userId: userId
                    });
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
                <FormGroup 
                    bsSize="small"
                    bsClass="form-group form-group-sm input-container"
                >
                    <FormControl 
                        type="text"
                        value={this.state.email} 
                        onChange={this.handleEmailChange} 
                        placeholder="Example@example.com"
                    />
                    <FormControl 
                        type="password" 
                        value={this.state.password} 
                        onChange={this.handlePasswordChange} 
                        placeholder="Password"
                    />
                </FormGroup>
                <h4 className="error-text">{this.state.error}</h4>
                <Button  
                    bsStyle="primary"
                    bsSize="small"
                    onClick={this.handleLoginClick} 
                    disabled={!(this.validateEmail(this.state.email) && this.state.password)}
                >
                    Log in
                </Button>
            </fieldset>
        )
    }
}