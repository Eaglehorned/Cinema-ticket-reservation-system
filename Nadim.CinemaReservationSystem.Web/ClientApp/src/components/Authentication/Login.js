import React, { Component } from 'react';
import { FormControl, FormGroup, Button } from 'react-bootstrap';
import AuthenticationService from '../../Services/AuthenticationService';

export default class Login extends Component {
    displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            error:''
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
        });
    }

    handleLoginClick = () =>{
        this.setState({
            error:'',
        });
        AuthenticationService.loginUser({
            email: this.state.email,
            password: this.state.password,
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
                    disabled={!AuthenticationService.allowLoginClick(this.state.email, this.state.password)}
                >
                    Log in
                </Button>
            </fieldset>
        )
    }
}