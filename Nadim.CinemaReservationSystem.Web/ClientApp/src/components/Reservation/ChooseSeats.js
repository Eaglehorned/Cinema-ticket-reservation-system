import React, { Component } from 'react';
import SeatsScheme from '../Cinema/SeatsScheme';

export default class ChooseSeats extends Component{
    displayName = ChooseSeats.displayName;

    render(){
        return(
            <div className="choose-container">
                <div className="seats-scheme-container">
                    <SeatsScheme
                        seatsArray={this.props.seats}
                    />
                </div>
                <div className="chosen-seats-container">

                </div>
            </div>
        );
    }
}