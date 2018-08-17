import React, { Component } from 'react';
import { Button, DropdownButton, MenuItem, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { DatePicker, TimePicker } from 'antd';
import SeatTypePrice from './SeatTypePriceBox';
import moment from 'moment';
import '../../styles/Session.css';

export default class FormSession extends Component{
    displayName = FormSession.displayName;

    constructor(props){
        super(props);
        this.state={
            beginTime: this.props.sessionInfo 
                ? moment(this.props.sessionInfo.beginTime)
                : moment(),
            cinemaList: [],
            chosenCinema: this.props.sessionInfo ? this.props.sessionInfo.cinema : undefined,
            chosenCinemaRoomsList: [],
            chosenCinemaRoom: this.props.sessionInfo ? this.props.sessionInfo.cinemaRoom : undefined,
            filmList: [],
            chosenFilm: this.props.sessionInfo ? this.props.sessionInfo.film : undefined,
            seatTypes:  this.props.sessionInfo ? this.props.sessionInfo.sessionSeatTypePrices : [],
            showHint: this.props.sessionInfo ? true : false
        }
        
        this.getCinemaList();
        this.getFilmList();

        if (this.props.sessionInfo){
            this.getCinemaRoomList(this.props.sessionInfo.cinema.cinemaId);
        }
    }

    validateDoubleNumber(number){
        const result = /^\d+([.,]\d+)?$/;
        return result.test(String(number));
    }

    informWithMessage = (message) =>{
        this.props.callBackInformWithMessage(message);
    }

    validateSeatTypePrices = () =>{
        let result = true;
        this.state.seatTypes.forEach(el => result = result && this.validateDoubleNumber(el.price));
        return result;
    }

    generateBeginTimeHelpBlock = () =>{
        let message = '';
        if (this.state.showHint){
            if (!this.state.beginTime){
                message = 'Begin time not entered.';
            }
            if (this.state.beginTime.date() <= moment().date()){
                message = 'Begin date cant be today or in the past.';
            }
        }
        return(
            <HelpBlock 
                className="font-italic"
            >
                {message}
            </HelpBlock> 
        );
    }

    allowSubmit = () =>{
        if (this.state.chosenCinema
        && this.state.chosenCinemaRoom
        && this.state.chosenFilm
        && this.state.beginTime
        && this.validateSeatTypePrices()
        && this.state.beginTime.date() > moment().date()){
            return true;
        }
        return false;
    }

    getCinemaList = () =>{
        fetch('api/cinemas', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
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
                return response.json().then((err) => {
                    throw new Error(`Not found. ${err.details}`);
                });
            }
        }).then(parsedJson => {
                this.setState({
                    cinemaList: parsedJson.requestedData
                });
            })
            .catch(error => this.informWithMessage(
                { 
                    text: error.message,
                    isError: true
                })
            );
    }

    getCinemaRoomList = (cinemaId) =>{
        fetch(`api/cinemas/${cinemaId}/cinemaRooms`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
        })
        .then(response => {
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
                return response.json().then((err) => {
                    throw new Error(`Not found. ${err.details}`);
                });
            }
        })
        .then(parsedJson => {
            this.setState({
                chosenCinemaRoomsList: parsedJson.requestedData
            });
        })
        .catch(error => this.informWithMessage(
            { 
                text: error.message,
                isError: true
            })
        );
    }

    getFilmList = () => {
        fetch('api/films', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
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
                    return response.json().then((err) => {
                        throw new Error(`Not found. ${err.details}`);
                    });
                }
            }).then(parsedJson => {
                    this.setState({
                        filmList: parsedJson.requestedData,
                    });
                })
                .catch(error => this.informWithMessage(
                    { 
                        text: error.message,
                        isError: true
                    })
                );
    }

    getSeatTypes = (cinemaRoomId) => {
        fetch(`api/cinemas/${this.state.chosenCinema.cinemaId}/cinemaRooms/${cinemaRoomId}/seatTypes`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
        })
        .then(response => {
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
                return response.json().then((err) => {
                    throw new Error(`Not found. ${err.details}`);
                });
            }
        })
        .then(parsedJson => {
            this.setState({
                seatTypes: parsedJson.requestedData.map((el) => {
                     el.price = ''; 
                     return el;
                    }),
            });
        })
        .catch(error => this.informWithMessage(
            { 
                text: error.message,
                isError: true
            })
        );
    }

    handleSelectCinema = (eventKey) =>{
        if (!this.state.chosenCinema || this.state.chosenCinema.cinemaId !== this.state.cinemaList[eventKey].cinemaId){
            this.setState({
                chosenCinema: this.state.cinemaList[eventKey],
                chosenCinemaRoom: undefined,
                seatTypes: []
            });
            this.getCinemaRoomList(this.state.cinemaList[eventKey].cinemaId);
        }
    }

    handleSelectCinemaRoom = (eventKey) =>{
        if (!this.state.chosenCinemaRoom || this.state.chosenCinemaRoom.cinemaRoomId !== this.state.chosenCinemaRoomsList[eventKey].cinemaRoomId){
            this.setState({
                chosenCinemaRoom: this.state.chosenCinemaRoomsList[eventKey]
            });
            this.getSeatTypes(this.state.chosenCinemaRoomsList[eventKey].cinemaRoomId);
        }
    }

    handleSelectFilm = (eventKey) =>{
        this.setState({
            chosenFilm: this.state.filmList[eventKey]
        });
    }

    handleChangeBeginTime = (time) =>{
        this.setState({
            beginTime: time
        });
    }

    handleChangePrice = (seatTypeInfo) =>{
        let tempSeatTypes = this.state.seatTypes;
        tempSeatTypes.find((el) => el.seatTypeId === seatTypeInfo.seatTypeId).price = seatTypeInfo.price;
        this.setState({
            seatTypes: tempSeatTypes
        });
    }

    handleSubmitClick = () =>{
        if (this.allowSubmit()){
            this.props.callBackReceiveSessionInfo({
                cinema: this.state.chosenCinema,
                cinemaRoom: this.state.chosenCinemaRoom,
                film: this.state.chosenFilm,
                beginTime: this.state.beginTime.format(),
                sessionSeatTypePrices: this.state.seatTypes
            });
        }
        this.setState({
            showHint: true
        });
    }

    handleCancelClick = () =>{
        this.props.callBackCancel();
    }


    renderChooseCinemaDropDown = () =>{
        return(
            <React.Fragment>
                <DropdownButton
                    bsStyle="default"
                    title="Choose cinema"
                    id={"choose-cinema-dropdown"}
                >
                    {
                        this.state.cinemaList.map((el, i) => 
                            <MenuItem
                                key={i}
                                eventKey={i}
                                onSelect={this.handleSelectCinema}
                            >
                                {`${el.name}, ${el.city}`}
                            </MenuItem>
                        )
                    }
                </DropdownButton>
            </React.Fragment>
        );
    }

    renderChooseCinemaRoomDropDown = () =>{
        return(
            <React.Fragment>
                <DropdownButton
                    bsStyle="default"
                    title="Choose cinema room"
                    id={"choose-cinema-room-dropdown"}
                    disabled={this.state.chosenCinemaRoomsList.length === 0}
                >
                    {
                        this.state.chosenCinemaRoomsList.map((el, i) => 
                            <MenuItem
                                key={i}
                                eventKey={i}
                                onSelect={this.handleSelectCinemaRoom}
                            >
                                {` ${el.name}`}
                            </MenuItem>
                        )
                    }
                </DropdownButton>
            </React.Fragment>   
        );
    }

    renderChooseFilmDropDown = () =>{
        return(
            <React.Fragment>
                <DropdownButton
                    bsStyle="default"
                    title="Choose film"
                    id={"choose-film-dropdown"}
                    disabled={this.state.filmList.length === 0}
                >
                    {
                        this.state.filmList.map((el, i) => 
                            <MenuItem
                                key={i}
                                eventKey={i}
                                onSelect={this.handleSelectFilm}
                            >
                                {` ${el.name}`}
                            </MenuItem>
                        )
                    }
                </DropdownButton>
            </React.Fragment>   
        );
    }

    renderGeneralInfoInputContent = () =>{
        return(
            <fieldset>
                <FormGroup
                    controlId="formChooseCinema"
                    validationState={!this.state.showHint || this.state.chosenCinema ? null : 'error'}
                >
                    <div>
                        <ControlLabel
                            className="font-large"
                        >
                            Cinema :
                            {
                                this.state.chosenCinema 
                                ? ` ${this.state.chosenCinema.name}, ${this.state.chosenCinema.city}`
                                : ''
                            }
                        </ControlLabel>
                    </div>
                    {this.renderChooseCinemaDropDown()}
                    {
                        !this.state.showHint || this.state.chosenCinema
                        ? ''
                        : <HelpBlock 
                            className="font-italic"
                        >
                            Cinema not chosen.
                        </HelpBlock> 
                    }
                </FormGroup>
                <FormGroup
                    controlId="formChooseCinemaRoom"
                    validationState={!this.state.showHint || this.state.chosenCinemaRoom ? null : 'error'}
                >
                    <div>
                        <ControlLabel
                            className="font-large"
                        >
                            Cinema room : 
                            {
                                this.state.chosenCinemaRoom 
                                ? ` ${this.state.chosenCinemaRoom.name}`
                                : ''
                            }
                        </ControlLabel>
                    </div>
                    {this.renderChooseCinemaRoomDropDown()}
                    {
                        !this.state.showHint || this.state.chosenCinemaRoom
                        ? ''
                        : <HelpBlock 
                            className="font-italic"
                        >
                            Cinema room not chosen.
                        </HelpBlock> 
                    }
                </FormGroup>
                <FormGroup
                    controlId="formChooseFilm"
                    validationState={!this.state.showHint || this.state.chosenFilm ? null : 'error'}
                >
                    <div>
                        <ControlLabel
                            className="font-large"
                        >
                            Film : 
                            {
                                this.state.chosenFilm 
                                ? ` ${this.state.chosenFilm.name}`
                                : ''
                            }
                        </ControlLabel>
                    </div>
                    {this.renderChooseFilmDropDown()}
                    {
                        !this.state.showHint || this.state.chosenFilm
                        ? ''
                        : <HelpBlock 
                            className="font-italic"
                        >
                            Cinema not chosen.
                        </HelpBlock> 
                    }
                </FormGroup>
                <FormGroup
                    controlId="formBeginDate"
                    validationState={!this.state.showHint 
                        || (this.state.beginTime
                        && this.state.beginTime.date() > moment().date())
                        ? null 
                        : 'error'}
                >
                    <ControlLabel
                        className="font-bold-large"
                    >
                        Date :
                    </ControlLabel>
                    <br/>
                    <DatePicker
                        onChange={this.handleChangeBeginTime}
                        value={this.state.beginTime}
                    />
                    {this.generateBeginTimeHelpBlock()}
                </FormGroup>
                <FormGroup
                    controlId="formBeginTime"
                >
                    <ControlLabel
                        className="font-bold-large"
                    >
                        Time :
                    </ControlLabel>
                    <br/>
                    <TimePicker
                        onChange={this.handleChangeBeginTime}
                        value={this.state.beginTime}
                    />
                </FormGroup>
            </fieldset>
        );
    }

    renderSetSeatTypePrices = () =>{
        return(
            <React.Fragment>
                <div className="list-container">
                    {
                        this.state.seatTypes.map((el)=>
                            <SeatTypePrice
                                key={el.seatTypeId}
                                showHint={this.state.showHint}
                                seatType={el}
                                callBackChangePrice={this.handleChangePrice}
                            />
                        )
                    }
                </div>
            </React.Fragment>
        );
    }

    renderContent = () =>{
        return(
            <React.Fragment>
                <h1>
                    Session information
                </h1>
                <div className="form-session-container">
                    <div className="session-information-container">
                        {this.renderGeneralInfoInputContent()}                   
                    </div>
                    <div className="session-seat-type-prices-container"> 
                        {this.renderSetSeatTypePrices()}
                    </div>
                </div>
                <div className="button-container">
                    <Button
                        onClick={this.handleSubmitClick}
                        bsStyle="primary"
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={this.handleCancelClick}
                    >
                        Cancel
                    </Button>
                </div>
            </React.Fragment>
        );
    }

    render(){
        const content = this.renderContent();
        return(
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
}