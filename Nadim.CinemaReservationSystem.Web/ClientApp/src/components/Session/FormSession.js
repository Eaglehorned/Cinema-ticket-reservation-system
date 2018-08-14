import React, { Component } from 'react';
import { Button, DropdownButton, MenuItem, FormGroup, ControlLabel } from 'react-bootstrap';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

export default class FormSession extends Component{
    displayName = FormSession.displayName;

    constructor(props){
        super(props);
        this.state={
            beginDateTime: this.props.sessionInfo 
                ? moment(this.props.sessionInfo.beginDateTime)
                : moment(),
            cinemaList: [],
            chosenCinema: undefined
        }
        this.handleChangeBeginDateTime = this.handleChangeBeginDateTime.bind(this);
        this.renderChooseCinemaDropDown = this.renderChooseCinemaDropDown.bind(this);
        
        this.getCinemaList();
    }

    informWithMessage = (message) => {
        this.props.callBackInformWithMessage(message);
    }

    getCinemaList = () => {
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

    handleSelectCinema = (eventKey) => {
        this.setState({
            chosenCinema: this.state.cinemaList[eventKey]
        })
    }

    handleChangeBeginDateTime(time){
        this.setState({
            beginDateTime: time
        });
    }

    renderChooseCinemaDropDown(){
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

    render(){
        return(
            <fieldset>
                <h1>
                    Session information
                </h1>
                <FormGroup
                    controlId="formChooseCinema"
                >
                    <div className="font-large">
                        <ControlLabel
                            className="font-bold"
                        >
                            Cinema : 
                        </ControlLabel>
                        {
                            this.state.chosenCinema 
                            ? `${this.state.chosenCinema.name}, ${this.state.chosenCinema.city}`
                            : ''
                        }
                    </div>
                    {this.renderChooseCinemaDropDown()}
                </FormGroup>
                <FormGroup
                    controlId="formBeginDate"
                >
                    <ControlLabel
                        className="font-bold-large"
                    >
                        Date :
                    </ControlLabel>
                    <br/>
                    <DatePicker
                        defaultValue={this.state.beginDateTime}
                        onChange={this.handleChangeBeginDateTime}
                    />
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
                        defaultValue={this.state.beginDateTime}
                        onChange={this.handleChangeBeginDateTime}
                    />
                </FormGroup>
            </fieldset>
        );
    }
}