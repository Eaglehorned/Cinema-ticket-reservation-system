import React, { Component } from 'react';
import Authentication from './Authentication/Authentication';
import '../styles/Header.css'

export default class Header extends Component{
    displayName = Header.displayName;

    constructor(props){
        super(props);
        this.setUserInfo = this.setUserInfo.bind(this);
    }

    setUserInfo(userInfo){
        this.prop.callBackSetUserInfo(userInfo);
    }

    render(){
        return(
            <div className="header">
                <Authentication
                    username={this.props.username}
                    callBackSetUserInfo={this.setUserInfo}
                />
            </div>
        )
    }
}