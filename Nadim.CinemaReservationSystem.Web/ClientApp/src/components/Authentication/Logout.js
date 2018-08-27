import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Logout extends Component{
    displayName = Logout.displayName;

    render(){
        return(            
            <div className="logout">
                <h3>Username: {this.props.username}</h3>
                <Button
                    onClick={this.props.callBackHandleLogout}
                >
                    Log out
                </Button>
                {
                this.props.role === 'admin' ?
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