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
            startDate: this.props.filmInfo ? new Date(this.props.filmInfo.startDate) : new Date(),
            endDate: this.props.filmInfo ? new Date(this.props.filmInfo.endDate) : new Date(),
            duration: this.props.filmInfo ? this.generateDurationDate(this.props.filmInfo.duration) : moment('00:00:00', 'HH:mm:ss').toDate(),
            description: this.props.filmInfo ? this.props.filmInfo.description : '',
            showHint: false
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeDuration = this.handleChangeDuration.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.allowSubmitClick = this.allowSubmitClick.bind(this);
        this.validateStartAndEndDates = this.validateStartAndEndDates.bind(this);
        this.validateDuration = this.validateDuration.bind(this);
    }

    generateDurationDate(duration){
        let temp = new Date();
        temp.setHours(Math.trunc(duration / 3600));
        temp.setMinutes(Math.trunc((duration % 3600) / 60));
        temp.setSeconds((duration % 3600) % 60);
        return temp;
    }

    handleNameChange(event){
        this.setState({
            name: event.target.value
        })
    }

    handleChangeStartDate(time){
        this.setState({
            startDate: time.toDate()
        })
    }

    handleChangeEndDate(time){
        this.setState({
            endDate: time.toDate()
        })
    }

    handleChangeDuration(time) {
        this.setState({
            duration: time.toDate()
        })
    }

    handleChangeDescription(event){
        this.setState({
            description: event.target.value
        })
    }

    handleSubmitClick(){
        if (this.allowSubmitClick()){
            this.props.callBackReceiveFilmInfo({
                name: this.state.name,
                startDate: new Date( 
                    Date.UTC(
                        this.state.startDate.getFullYear(), 
                        this.state.startDate.getMonth(),
                        this.state.startDate.getDate()
                    )
                ),
                endDate: new Date(
                    Date.UTC(
                        this.state.endDate.getFullYear(), 
                        this.state.endDate.getMonth(),
                        this.state.endDate.getDate()
                    )
                ),
                duration: this.state.duration.getHours() * 3600 
                    + this.state.duration.getMinutes() * 60
                    + this.state.duration.getSeconds(),
                description: this.state.description
            });
        }
        this.setState({
            showHint: true
        })
    }

    handleCancelClick(){
        this.props.callBackCancel();
    }

    allowSubmitClick(){
        if(this.state.name
        && this.state.description
        && this.state.endDate.getTime() > this.state.startDate.getTime()
        && (this.state.duration.getHours() !== 0
        || this.state.duration.getMinutes() !== 0
        || this.state.duration.getSeconds() !== 0)){
            return true;
        }
        return false;
    }

    validateDuration(){
        return !this.state.showHint 
        || this.state.duration.getHours() !== 0
        || this.state.duration.getMinutes() !== 0
        || this.state.duration.getSeconds() !== 0
    }

    validateString(str){
        return !this.state.showHint || str;
    }

    validateStartAndEndDates(){
        return !this.state.showHint || this.state.endDate.getTime() > this.state.startDate.getTime();
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
                        defaultValue={moment(this.state.startDate)}
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
                        defaultValue={moment(this.state.endDate)}
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
                        defaultValue={moment(this.state.duration)}
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