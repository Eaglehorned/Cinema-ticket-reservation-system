import React, { Component } from 'react';
import { Route } from 'react-router';
import Authentication from './components/Authentication'

export default class App extends Component {
displayName = App.name

    render() {
        return (
            <div>
                <Authentication/>
            </div>
        );
    }
}
