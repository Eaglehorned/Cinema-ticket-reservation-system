import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

export default class MyAlert extends Component{
    displayName = MyAlert.displayName;

    render(){
        return(
            <Alert
                bsStyle={this.props.alertStyle}
                className={`alert-bottom`}
                onDismiss={this.props.callBackOnDismiss}
            >
                <div className="font-bold-x-large">
                {
                    this.props.alertStyle === 'danger'
                    ? 'Error'
                    : 'Success'
                }
                </div>
                <div className="font-large">
                    {this.props.infoMessage}
                </div>
            </Alert>
        );
    }
}