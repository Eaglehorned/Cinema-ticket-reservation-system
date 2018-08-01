import React, { Component } from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import FormGeneralCinemaInfo from './FormGeneralCinemaInfo';
import '../../styles/FormCinema.css';

export default class FormCinema extends Component{
    displayName = FormCinema.displayName;
    constructor(props){
        super(props);
        this.state={
            cinemaInfo: this.props.cinema ? this.props.cinema.info : undefined,
            cinemaRooms: this.props.cinema ? this.props.cinema.rooms : undefined,
            chosenRoom: {},
            chosenOperation: ''
        };
        this.renderFormCinemaContent = this.renderFormCinemaContent.bind(this);
        this.renderCinemaInfoAndActionsContent = this.renderCinemaInfoAndActionsContent.bind(this);
        this.renderCinemaActionButtons = this.renderCinemaActionButtons.bind(this);
        this.handleCinemaGeneralInfoInput = this.handleCinemaGeneralInfoInput.bind(this);
        this.handleMenuItemSelect = this.handleMenuItemSelect.bind(this);
        this.handleChangeCinemaInfoClick = this.handleChangeCinemaInfoClick.bind(this);
        this.renderComponentContent = this.renderComponentContent.bind(this);
    }

    handleCinemaGeneralInfoInput(cinemaData){
        this.setState({
            cinemaInfo: cinemaData
        });
    }

    handleMenuItemSelect(eventKey){
        this.setState({
            chosenRoom: this.state.cinemaRooms[eventKey]
        });
    }

    handleChangeCinemaInfoClick(){
        this.setState({
            chosenOperation: 'editCinemaInfo'
        });
    }

    renderCinemaActionButtons(){
        return(
            <div>
                <fieldset>
                    <legend>
                        Cinema
                    </legend>
                    <Button
                        onClick={this.handleChangeCinemaInfoClick}
                    >
                        Change general information
                    </Button>
                </fieldset>
                <fieldset>
                    <legend>
                        Cinema rooms
                    </legend>
                    {
                        this.state.cinemaRooms && this.state.cinemaRooms.length !== 0 ?
                        <DropdownButton
                            bsStyle="default"
                            title="Cinema rooms"
                            id="choose-cinema-to-edit"
                        >
                        {
                            this.state.cinemaRooms.map((el, i)=>
                                <MenuItem 
                                    eventKey={i}
                                    onSelect={this.handleMenuItemSelect}
                                    key={i}
                                >
                                    {el.name}
                                </MenuItem>
                            )
                        }
                        </DropdownButton> :
                        <div className="font-bold-large">
                            Cinema rooms list is empty
                        </div>
                    }
                    <div>
                        <Button>
                            Add cinema room
                        </Button>
                    </div>
                    <div>
                        <Button>
                            Edit cinema room
                        </Button>
                    </div>
                    <div>
                        <Button>
                            Edit cinema 
                            rooms seats
                        </Button>
                    </div>
                </fieldset>
            </div>
        )
    }

    renderFormCinemaContent(){
        return(
            <FormGeneralCinemaInfo 
                callBackFromParent={this.handleCinemaGeneralInfoInput}
                callBackCancelGeneralCinemaInfoInput={this.handleCancelGeneralCinemaInfoInput}
                cinemaInfo={this.state.cinemaInfo}
            />
        );
    }

    renderCinemaInfoAndActionsContent(){
        return (
            <div>
                <div className="form-cinema-room-container cinema-room-information-container">
                    <div className="font-x-large">
                        <span className="font-bold"> Cinema name : </span>{this.state.cinemaInfo.name}
                    </div>
                    <div className="font-x-large">
                        <span className="font-bold"> Cinema city : </span>{this.state.cinemaInfo.city}
                    </div>
                    <div className="font-x-large">
                        <span className="font-bold"> Default seat price : </span>{this.state.cinemaInfo.defaultSeatPrice}
                    </div>
                    <div className="font-x-large">
                        <span className="font-bold"> Vip seat price : </span>{this.state.cinemaInfo.vipSeatPrice}
                    </div>
                </div>
                <div className="form-cinema-room-container cinema-room-buttons-container">
                    {this.renderCinemaActionButtons()}
                </div>
            </div>
        );
    }

    renderComponentContent(){
        if (!this.state.cinemaInfo){
            return this.renderFormCinemaContent();
        }
        if(this.state.chosenOperation === 'editCinemaInfo'){
            return this.renderFormCinemaContent();
        }
        return this.renderCinemaInfoAndActionsContent();
    }

    render(){
        const content = this.renderComponentContent();

        return(
            <div className="form-cinema-room-container">
                {content}
            </div>
        )
    }
}