import React, { Component } from 'react';
import { Route } from 'react-router';
import LogIn from './components/Login';

export default class App extends Component {
displayName = App.name

    render() {
        return (
            <div>
                <LogIn/>
            </div>
        );
    }
}
