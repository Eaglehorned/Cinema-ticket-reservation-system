import React, { Component } from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import FormGeneralCinemaInfo from './FormGeneralCinemaInfo';
import FormCinemaRoom from './FormCinemaRoom';
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
        this.renderFormCinemaRoomContent = this.renderFormCinemaRoomContent.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.receiveCinemaRoom = this.receiveCinemaRoom.bind(this);
        this.getCinemaRoom = this.getCinemaRoom.bind(this);
    }

    getCinemaRoom(){
        //TODO fetch to get cinema room whole info
    }

    receiveCinemaRoom(){
        //TODO fetch to add/edit cinema room
    }

    callBackCancel(){}

    handleCinemaGeneralInfoInput(cinemaData){
        this.setState({
            cinemaInfo: cinemaData,
            chosenOperation: ''
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

    handleCancel(){
        this.setState({
            chosenOperation:''
        })
    }

    renderCinemaActionButtons(){
        return(
            <React.Fragment>
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
                        <Button
                            onClick={() => this.setState({ chosenOperation: 'createCinemaRoom'})}
                        >
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
                <fieldset className="concluding-buttons">
                    <Button
                    >
                        Submit
                    </Button>
                    <Button
                    >
                        Cancel
                    </Button>
                </fieldset>
            </React.Fragment>
        )
    }

    renderFormCinemaRoomContent(){
        let cinemaRoom = this.state.chosenOperation !== 'createCinemaRoom' 
            ? this.getCinemaRoom() 
            : undefined;
        return(
            <FormCinemaRoom
                callBackReceiveCinemaRoom={this.receiveCinemaRoom}
                cinemaRoom={cinemaRoom}
                callBackCancel={this.handleCancel}
            />
        );
    }

    renderFormCinemaContent(){
        return(
            <React.Fragment>
                <h1>Cinema</h1>
                <FormGeneralCinemaInfo 
                    callBackFromParent={this.handleCinemaGeneralInfoInput}
                    callBackCancelGeneralCinemaInfoInput={this.handleCancelGeneralCinemaInfoInput}
                    cinemaInfo={this.state.cinemaInfo}
                />
            </React.Fragment>
        );
    }

    renderCinemaInfoAndActionsContent(){
        return (
            <React.Fragment>
                <h1>Cinema</h1>
                <div className="form-cinema-room-container cinema-room-information-container">
                <h2>Cinema information</h2>
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
            </React.Fragment>
        );
    }

    renderComponentContent(){
        if (!this.state.cinemaInfo){
            return this.renderFormCinemaContent();
        }
        switch(this.state.chosenOperation){
            case 'editCinemaInfo':
                return this.renderFormCinemaContent();
            case 'createCinemaRoom':
                return this.renderFormCinemaRoomContent();
            default:
                return this.renderCinemaInfoAndActionsContent();
        }

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