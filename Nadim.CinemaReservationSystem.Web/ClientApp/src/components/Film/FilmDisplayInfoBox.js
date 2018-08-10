import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class FilmDisplayInfoBox extends Component{
    displayName = FilmDisplayInfoBox.displayName;

    constructor(props){
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleEditClick(){
        this.props.callBackEditFilm(this.props.filmInfo.filmId);
    }

    render(){
        return(
        <div className="list-box-container">
            <div className="font-large">
                <span className="font-bold">Name: </span>{this.props.filmInfo.name}
            </div>
            <Button
                onClick={this.handleEditClick}
            >
                Edit
            </Button>
        </div>
        );
    }
}