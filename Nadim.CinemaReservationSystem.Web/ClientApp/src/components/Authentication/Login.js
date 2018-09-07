import React, { Component } from 'react';
import { FormControl, FormGroup, Button, ControlLabel, Form, Col } from 'react-bootstrap';
import userService from '../../Services/UserService';

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
        userService.loginUser({
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
                <Form
                    horizontal
                >
                    <FormGroup
                        // bsSize="small"
                        bsClass="input-container"
                    >
                        <Col sm={2}>
                            <ControlLabel>Email:</ControlLabel>
                        </Col>
                        <Col sm={10}>
                        <FormControl
                            bsSize="small"
                            type="text"
                            value={this.state.email} 
                            onChange={this.handleEmailChange} 
                            placeholder="Example@example.com"
                        />
                        </Col>
                    </FormGroup>
                {/* </Form>
                <Form
                    horizontal
                > */}
                    <FormGroup 
                        bsSize="small"
                        bsClass="form-group form-group-sm input-container"
                    >
                        <ControlLabel>Password :</ControlLabel>{' '}
                        <FormControl 
                            type="password" 
                            value={this.state.password} 
                            onChange={this.handlePasswordChange} 
                            placeholder="Password"
                        />
                    </FormGroup>
                </Form>
                <h4 className="error-text">{this.state.error}</h4>
                <Button  
                    bsStyle="primary"
                    bsSize="small"
                    onClick={this.handleLoginClick} 
                    disabled={!userService.validateLoginDate(this.state.email, this.state.password)}
                >
                    Log in
                </Button>
            </fieldset>
        )
    }
}