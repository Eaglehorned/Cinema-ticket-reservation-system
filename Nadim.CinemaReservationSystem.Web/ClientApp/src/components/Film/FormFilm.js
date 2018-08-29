import React, { Component } from 'react';
import { FormControl, ControlLabel, FormGroup, Button, HelpBlock } from 'react-bootstrap';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

export default class FormFilm extends Component{
    displayName = FormFilm.displayName;

    constructor(props){
        super(props);
        this.state={
            name: this.props.filmInfo ? this.props.filmInfo.name : '',
            startDate: this.props.filmInfo ? moment(this.props.filmInfo.startDate) : moment(),
            endDate: this.props.filmInfo ? moment(this.props.filmInfo.endDate) : moment(),
            duration: this.props.filmInfo ? this.generateDurationDate(this.props.filmInfo.duration) : moment('00:00:00', 'HH:mm:ss'),
            description: this.props.filmInfo ? this.props.filmInfo.description : '',
            showHint: false
        }
    }

    generateDurationDate = (duration) =>{
        let temp = moment({
            hours: Math.trunc(duration / 3600),
            minutes: Math.trunc((duration % 3600) / 60),
            seconds: (duration % 3600) % 60
        });
        return temp;
    }

    handleNameChange = (event) =>{
        this.setState({
            name: event.target.value
        })
    }

    handleChangeStartDate = (time) =>{
        this.setState({
            startDate: time
        })
    }

    handleChangeEndDate = (time) =>{
        this.setState({
            endDate: time
        })
    }

    handleChangeDuration = (time) =>{
        this.setState({
            duration: time
        })
    }

    handleChangeDescription = (event) =>{
        this.setState({
            description: event.target.value
        })
    }

    handleSubmitClick = () =>{
        if (this.allowSubmitClick()){
            this.props.callBackReceiveFilmInfo({
                name: this.state.name,
                startDate: new Date( 
                    Date.UTC(
                        this.state.startDate.year(), 
                        this.state.startDate.month(),
                        this.state.startDate.date()
                    )
                ),
                endDate: new Date(
                    Date.UTC(
                        this.state.endDate.year(), 
                        this.state.endDate.month(),
                        this.state.endDate.date()
                    )
                ),
                duration: this.state.duration.hours() * 3600 
                    + this.state.duration.minutes() * 60
                    + this.state.duration.seconds(),
                description: this.state.description
            });
        }
        this.setState({
            showHint: true
        })
    }

    handleCancelClick = () =>{
        this.props.callBackCancel();
    }

    allowSubmitClick = () =>{
        if(this.state.name
        && this.state.description
        && this.state.endDate.isAfter(this.state.startDate)
        && (this.state.duration.hours() !== 0
        || this.state.duration.minutes() !== 0
        || this.state.duration.seconds() !== 0)){
            return true;
        }
        return false;
    }

    validateDuration = () =>{
        return !this.state.showHint 
        || this.state.duration.hours() !== 0
        || this.state.duration.minutes() !== 0
        || this.state.duration.seconds() !== 0
    }

    validateString = (str) =>{
        return !this.state.showHint || str;
    }

    validateStartAndEndDates = () =>{
        return !this.state.showHint || this.state.endDate.isAfter(this.state.startDate);
    }

    render(){
        return(
            <fieldset>
                <h1>
                    Film information
                </h1>
                <FormGroup
                    controlId="formNameText"
                    validationState={this.validateString(this.state.name) ? null : 'error'}
                >
                    <ControlLabel
                        className="font-bold-large"
                    >
                        Name
                    </ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.name}
                        placeholder="Name"
                        onChange={this.handleNameChange}
                    />
                    {
                        this.validateString(this.state.name) 
                        ? ''
                        : <HelpBlock 
                            className="font-italic"
                        >
                            Data not entered.
                        </HelpBlock> 
                    }
                </FormGroup>
                <FormGroup
                    controlId="formStartDateText"
                    validationState={this.validateStartAndEndDates() ? null : 'error'}
                >
                    <ControlLabel
                        className="font-bold-large"
                    >
                        Start date
                    </ControlLabel>
                    <br/>
                    <DatePicker
                        defaultValue={this.state.startDate}
                        onChange={this.handleChangeStartDate}
                    />
                    {
                        this.validateStartAndEndDates() 
                        ? ''
                        :  <HelpBlock 
                            className="font-italic"
                        >
                            End date is equal or less than start date.
                        </HelpBlock> 
                    }
                </FormGroup>
                <FormGroup
                    controlId="formEndDateText"
                    validationState={this.validateStartAndEndDates() ? null : 'error'}
                >
                    <ControlLabel
                        className="font-bold-large"
                    >
                        End date
                    </ControlLabel>
                    <br/>
                    <DatePicker
                        defaultValue={this.state.endDate}
                        onChange={this.handleChangeEndDate}
                    />
                    {
                        this.validateStartAndEndDates() 
                        ? ''
                        : <HelpBlock 
                            className="font-italic"
                        >
                            End date is equal or less than start date.
                        </HelpBlock> 
                    }
                </FormGroup>
                <FormGroup
                    controlId="formDurationText"
                    validationState={this.validateDuration() ? null : 'error'}
                >
                    <ControlLabel
                        className="font-bold-large"
                    >
                        Duration
                    </ControlLabel>
                    <br/>
                    <TimePicker
                        defaultValue={this.state.duration}
                        onChange={this.handleChangeDuration}
                    />
                    {
                        this.validateDuration() 
                        ? ''
                        : <HelpBlock 
                            className="font-italic"
                        >
                            End date is equal or less than start date.
                        </HelpBlock> 
                    }
                </FormGroup>
                <FormGroup 
                    controlId="formDescriptionText"
                    validationState={this.validateString(this.state.description) ? null : 'error'}
                >
                    <ControlLabel
                        className="font-bold-large"
                    >
                        Description
                    </ControlLabel>
                    <FormControl 
                        componentClass="textarea" 
                        placeholder="Description" 
                        value={this.state.description}
                        onChange={this.handleChangeDescription}
                    />
                    {
                        this.validateString(this.state.description) 
                        ? ''
                        :  <HelpBlock 
                            className="font-italic"
                        >
                            Data not entered.
                        </HelpBlock> 
                    }
                </FormGroup>
                <Button
                    bsStyle="primary"
                    onClick={this.handleSubmitClick}
                >
                    Submit
                </Button>
                <Button
                    onClick={this.handleCancelClick}
                >
                    Cancel
                </Button>
            </fieldset>
        );
    }
}