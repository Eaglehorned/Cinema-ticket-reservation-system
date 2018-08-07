import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class CinemaDisplayInfoBox extends Component{
    displayName = CinemaDisplayInfoBox.displayName;

    constructor(props){
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleEditClick(){
        this.props.callBackEditCinema(this.props.cinemaInfo.cinemaId);
    }

    render(){
        return(
            <div className="list-box-container">
                <div className="font-large">
                    <span className="font-bold">Name: </span>{this.props.cinemaInfo.name}
                </div>
                <div className="font-large">
                    <span className="font-bold">City: </span>{this.props.cinemaInfo.city}
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