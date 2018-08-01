import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../../styles/FormCinema.css';

export default class FormCinema extends Component{
    displayName = FormCinema.displayName;
    constructor(props){
        super(props);
        this.state={
            cinemaRoomInfo: this.props.cinema
        };
        this.renderFormCinemaContent = this.renderFormCinemaContent.bind(this);
        this.renderCinemaInfoAndActionsContent = this.renderCinemaInfoAndActionsContent.bind(this);
        this.renderCinemaActionButtons = this.renderCinemaActionButtons.bind(this);
    }

    renderCinemaActionButtons(){
        return(
            <div>
                <fieldset>
                    <legend>
                        Cinema
                    </legend>
                    <Button>
                        Change general information
                    </Button>
                </fieldset>
                <fieldset>
                    <legend>
                        Cinema rooms
                    </legend>
                    <Button>
                        Add cinema room
                    </Button>
                </fieldset>
            </div>
        )
    }

    renderFormCinemaContent(){}

    renderCinemaInfoAndActionsContent(){
        return (
            <div>
                <div className="form-cinema-room-container cinema-room-information-container">
                    <div className="font-large">
                        <span className="font-bold"> Cinema name : </span>{this.state.cinemaRoomInfo.name}
                    </div>
                    <div className="font-large">
                        <span className="font-bold"> Cinema city : </span>{this.state.cinemaRoomInfo.city}
                    </div>
                    <div className="font-large">
                        <span className="font-bold"> Default seat price : </span>{this.state.cinemaRoomInfo.defaultSeatPrice}
                    </div>
                    <div className="font-large">
                        <span className="font-bold"> Vip seat price : </span>{this.state.cinemaRoomInfo.vipSeatPrice}
                    </div>
                </div>
                <div className="form-cinema-room-container cinema-room-buttons-container">
                    {this.renderCinemaActionButtons()}
                </div>
            </div>
        )
    }

    render(){
        const content = this.state.cinemaRoomInfo ? 
                            this.renderCinemaInfoAndActionsContent() :
                            this.renderFormCinemaContent();

        return(
            <div className="form-cinema-room-container">
                {content}
            </div>
        )
    }
}