import React, { Component } from 'react';
import { Route } from 'react-router';
import LogIn from './components/Login';
import Registration from './components/Registration';

export default class App extends Component {
displayName = App.name

    render() {
        return (
            <div>
                <LogIn/>
                <Registration/>
            </div>
        );
    }
}
