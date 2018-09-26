import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import userService from '../../Services/UserService';

export default class Logout extends Component{
    displayName = Logout.displayName;

    handleLogout = () =>{
        userService.logOut();
        this.props.callBackHandleLogout();
    }

    render(){
        return(            
            <div className="logout">
                <h3>{userService.getUsername()}</h3>
                <div className="buttons-container">
                    <Button
                        className="btn-log-out"
                        onClick={this.handleLogout}
                    >
                        Log out
                    </Button>
                    {
                    userService.getRole() === 'admin' ?
                    <React.Fragment>
                        <Button
                            className="left"
                            bsSize="xsmall"
                            onClick={() => this.props.callBackSetShownRole('admin')}
                        >
                            Admin
                        </Button>
                        <Button
                            bsSize="xsmall"
                            className="right"
                            onClick={() => this.props.callBackSetShownRole('user')}
                        >
                            User
                        </Button>
                    </React.Fragment>
                    : ''
                    }
                </div>
            </div>
        );
    };
}