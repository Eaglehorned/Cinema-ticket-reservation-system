import React, { Component } from 'react';
import { FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

export default class FormFilm extends Component{
    displayName = FormFilm.displayName;

    constructor(props){
        super(props);
        this.state={
            name: this.props.filmInfo ? this.props.filmInfo.name : '',
            startDate: this.props.filmInfo ? this.props.filmInfo.startDate : new Date(),
            endDate: this.props.filmInfo ? this.props.filmInfo.endDate : new Date(),
            duration: this.props.filmInfo ? this.props.filmInfo.duration : undefined,
            description: this.props.filmInfo ? this.props.filmInfo.description : '',
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeDuration = this.handleChangeDuration.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleNameChange(event){
        this.setState({
            name: event.target.value
        })
    }

    handleChangeStartDate(time){
        console.log(time.toDate());
        this.setState({
            startDate: time.toDate()
        })
    }

    handleChangeEndDate(time){
        console.log(time.toDate());
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

    render(){
        return(
            <fieldset>
                <h1>
                    Film information
                </h1>
                <FormGroup
                    controlId="formNameText"
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
                </FormGroup>
                <FormGroup
                    controlId="formStartDateText"
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
                </FormGroup>
                <FormGroup
                    controlId="formEndDateText"
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
                </FormGroup>
                <FormGroup
                    controlId="formDurationText"
                >
                    <ControlLabel
                        className="font-bold-large"
                    >
                        Duration
                    </ControlLabel>
                    <br/>
                    <TimePicker
                        onChange={this.handleChangeDuration}
                    />
                </FormGroup>
                <FormGroup controlId="formDescriptionText">
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
                </FormGroup>
                <Button
                    bsStyle="primary"
                    onClick={this.handleSubmitClick}
                >
                    Submit
                </Button>
                <Button>
                    Cancel
                </Button>
            </fieldset>
        );
    }
}