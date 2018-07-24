import React, { Component } from 'react';
import { Route } from 'react-router';
import Authentication from './components/Authentication'
import AddCinema from './components/AddCinema'

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <div>
                <Authentication/>
                <AddCinema/>
            </div>
        );
    }
}
