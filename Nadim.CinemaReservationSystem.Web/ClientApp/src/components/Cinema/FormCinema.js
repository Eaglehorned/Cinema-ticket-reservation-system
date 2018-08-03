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
            cinemaRooms: this.props.cinema ? this.props.cinema.cinemaRooms : undefined,
            chosenRoom: {},
            chosenOperation: '',
            chosenCinemaRoom: {}
        };
        this.cancelCurrentOperation = this.cancelCurrentOperation.bind(this);
        this.cancelFormCinema = this.cancelFormCinema.bind(this);
        this.getCinemaRoom = this.getCinemaRoom.bind(this);
        this.editCinemaInfo = this.editCinemaInfo.bind(this);
        this.createCinemaRoom = this.createCinemaRoom.bind(this);
        this.handleCinemaCreateGeneralInfo = this.handleCinemaCreateGeneralInfo.bind(this);
        this.handleMenuItemSelect = this.handleMenuItemSelect.bind(this);
        this.handleChangeCinemaInfoClick = this.handleChangeCinemaInfoClick.bind(this);
        this.handleCinemaEditGeneralInfo = this.handleCinemaEditGeneralInfo.bind(this);
        this.renderFormCreateCinemaContent = this.renderFormCreateCinemaContent.bind(this);
        this.renderFormEditCinemaContent = this.renderFormEditCinemaContent.bind(this);
        this.renderCinemaInfoAndActionsContent = this.renderCinemaInfoAndActionsContent.bind(this);
        this.renderCinemaActionButtons = this.renderCinemaActionButtons.bind(this);
        this.renderComponentContent = this.renderComponentContent.bind(this);
        this.renderFormCinemaRoomCreateContent = this.renderFormCinemaRoomCreateContent.bind(this);
        this.renderFormCinemaRoomEditContent = this.renderFormCinemaRoomEditContent.bind(this);
    }

    getCinemaRoom(){
        //TODO fetch to get cinema room whole info
    }

    createCinemaRoom(cinemaRoomData){
        this.setState({
            chosenOperation: ''
        });
        fetch(`api/cinemas/${this.state.cinemaInfo.cinemaId}/cinemaRooms`, {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify({
                cinemaId: this.state.cinemaInfo.cinemaId,
                name: cinemaRoomData.name,
                seats: [].concat(...cinemaRoomData.cinemaRoomSeats)
            })
        }).then(response => {
                if (response.ok){
                    return response;
                }
                if (response.status === 400){
                    return response.json().then((err) => {
                        throw new Error(`Bad request. ${err.details}`);
                    });
                }
                if (response.status === 401){
                    throw new Error('You need to authorize to do that action. ');
                }
                if (response.status === 404){
                        throw new Error('Cant find resourse. ');
                }
            }).then(parsedJson => {
                //add room to room list
            })
            .catch(error => this.props.callBackInformWithMessage(error.message));
    }
    
    editCinemaInfo(){
        fetch(`api/cinemas/${this.state.cinemaInfo.cinemaId}`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify(this.state.cinemaInfo)
        }).then(response => {
            if (response.ok){
                return response.json();
            }
            if (response.status === 400){
                return response.json().then((err) => {
                    throw new Error(`Bad request. ${err.details}`);
                });
            }
            if (response.status === 401){
                throw new Error('You need to authorize to do that action.');
            }
            if (response.status === 404){
                    throw new Error('Cant find resourse. ');
            }
        }).then(parsedJson => {
                this.informWithMessage('Cinema information edited.');
            })
            .catch(error => this.informWithMessage(error.message));
            this.setState({
                chosenOperation: ''
            });
    }

    cancelFormCinema(){
        this.props.callBackCancel();
    }

    cancelCurrentOperation(){
        this.setState({
            chosenOperation: ''
        })
    }

    handleCinemaCreateGeneralInfo(cinemaData){
        this.props.callBackReceiveCinemaInfo(cinemaData);
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

    handleCinemaEditGeneralInfo(){

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
                        <Button
                            onClick={() => this.setState({ chosenOperation: 'editCinemaRoom'})}
                        >
                            Edit cinema room
                        </Button>
                    </div>
                </fieldset>
                <fieldset className="concluding-buttons">
                    <Button
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={this.cancelFormCinema}
                    >
                        Cancel
                    </Button>
                </fieldset>
            </React.Fragment>
        )
    }

    renderFormCinemaRoomCreateContent(){
        return(
            <FormCinemaRoom
                callBackReceiveCinemaRoom={this.createCinemaRoom}
                callBackCancel={this.cancelCurrentOperation}
            />
        );
    }

    renderFormCinemaRoomEditContent(){
        return(
            <FormCinemaRoom
                callBackReceiveCinemaRoom={this.createCinemaRoom}
                cinemaRoom={this.state.chosenCinemaRoom}
                //TODO get cinemaRoom info
                callBackCancel={this.cancelCurrentOperation}
            />
        );
    }

    renderFormCreateCinemaContent(){
        return(
            <React.Fragment>
                <h1>Cinema</h1>
                <FormGeneralCinemaInfo 
                    callBackFromParent={this.handleCinemaCreateGeneralInfo}
                    callBackCancel={this.cancelFormCinema}
                />
            </React.Fragment>
        );
    }

    renderFormEditCinemaContent(){
        return(
            <React.Fragment>
                <h1>Cinema</h1>
                <FormGeneralCinemaInfo 
                    callBackFromParent={this.handleCinemaEditGeneralInfo}
                    callBackCancel={this.cancelCurrentOperation}
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
            return this.renderFormCreateCinemaContent();
        }
        switch(this.state.chosenOperation){
            case 'editCinemaInfo':
                return this.renderFormEditCinemaContent();
            case 'createCinemaRoom':
                return this.renderFormCinemaRoomCreateContent();
            case 'editCinemaRoom':
                return this.renderFormCinemaRoomEditContent();
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