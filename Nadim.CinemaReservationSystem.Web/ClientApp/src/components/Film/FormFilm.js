import React, { Component } from 'react';
import { FormControl, ControlLabel } from 'react-bootstrap';

export default class FormFilm extends Component{
    displayName = FormFilm.displayName;

    constructor(props){
        super(props);
        this.state={
            name:'',
        }
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        this.setState({
            name: event.target.value
        })
    }

    render(){
        return(
            <fieldset>
                <h1>
                    Film information
                </h1>
                <ControlLabel 
                    htmlFor="nameInput" 
                    className="font-bold-large"
                >
                    Name :
                </ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.name}
                    placeholder="Name"
                    onChange={this.handleNameChange}
                />
            </fieldset>
        );
    }
}