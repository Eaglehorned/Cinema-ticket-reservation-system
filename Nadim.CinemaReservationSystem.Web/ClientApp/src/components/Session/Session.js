import React, { Component } from 'react';
import FormSession from './FormSession';

export default class Session extends Component{
    displayName = Session.displayName;
    constructor(props){
        super(props);
    }

    informWithMessage = (message) => {
        this.props.callBackInformWithMessage(message);
    }

    render(){
        let content = <FormSession callBackInformWithMessage={this.informWithMessage}/>;
        return(
            <div className="content-container">
                <div className="well">
                    {content}
                </div>
            </div>
        );
    }
}