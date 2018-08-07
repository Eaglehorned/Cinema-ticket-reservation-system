import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class CinemaRoomDisplayInfoBox extends Component{
    displayName = CinemaRoomDisplayInfoBox.displayName;

    constructor(props){
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleEditClick(){
        this.props.callBackEditCinemaRoom(this.props.cinemaRoomInfo.cinemaRoomId);
    }

    render(){
        return(
        <div className="list-box-container">
            <div className="font-large">
                <span className="font-bold">Name: </span>{this.props.cinemaRoomInfo.name}
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