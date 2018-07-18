import React, { Component } from 'react';

export default class Authentication extends Component {
    displayName = Authentication.name;

    constructor(props) {
        super(props);
        this.state = ({
            registrationChosen: true
        })
    }

    renderLogInComponents(){
        return(            
        <div>
            <input type="email" className="form-control form-control-sm" placeholder="Example@example.com" />
            <input type="password" className="form-control form-control-sm" placeholder="Password"/>
            <button type="button" class="btn btn-primary btn-sm">Log in</button>
        </div>);
    }

    renderRegistrationComponents(){
        return(
            <div>
                <input type="email" className="form-control form-control-sm" placeholder="Example@example.com" />
                <input type="password" className="form-control form-control-sm" placeholder="Password"/>
                <input type="name" className="form-control form-control-sm" placeholder="First name" />
                <input type="name" className="form-control form-control-sm" placeholder="Last name"/>
                <button type="button" class="btn btn-primary btn-sm">Register</button>
            </div>
        );
    }

    render() {

        let content = this.state.registrationChosen? this.renderRegistrationComponents() : this.renderLogInComponents();

        return (
            <div>
                {content}
            </div>
        )
    }
}