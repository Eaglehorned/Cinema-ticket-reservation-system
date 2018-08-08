import React, { Component } from 'react';
import FormFilm from './FormFilm';

export default class Film extends Component{
    displayName = Film.displayName;
    
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="add-cinema-container">
                <div className="well">
                    <FormFilm/>
                </div>
            </div>
        );
    }
}