import React, { Component } from 'react';

export default class Registration extends Component {
    displayName = Registration.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="authentication-container">
                <input type="email" className="form-control form-control-sm" placeholder="Example@example.com" />
                <input type="password" className="form-control form-control-sm" placeholder="Password"/>
                <input type="name" className="form-control form-control-sm" placeholder="First name" />
                <input type="name" className="form-control form-control-sm" placeholder="Last name"/>
                <button type="button" class="btn btn-primary btn-sm">Register</button>
            </div>
        ); 
    }
}