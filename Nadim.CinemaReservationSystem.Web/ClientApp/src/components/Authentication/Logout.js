import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import userService from '../../Services/UserService';

export default class Logout extends Component{
    displayName = Logout.displayName;

    handleLogout = () =>{
        userService.setInfo('', '', '', '');
        this.props.callBackHandleLogout();
    }

    render(){
        return(            
            <div className="logout">
                <h3>Username: {userService.getUsername()}</h3>
                <Button
                    onClick={this.handleLogout}
                >
                    Log out
                </Button>
                {
                userService.getRole() === 'admin' ?
                <div>
                    <div>
                        <Button
                            bsSize="xsmall"
                            onClick={() => this.props.callBackSetShownRole('admin')}
                        >
                            Admin
                        </Button>
                    </div>
                    <div>
                        <Button
                            bsSize="xsmall"
                            onClick={() => this.props.callBackSetShownRole('user')}
                        >
                            User
                        </Button>
                    </div>
                </div>
                : ''
                }
            </div>
        );
    };
}