import React, { Component } from 'react';
import moment from 'moment';
import filmService from '../../Services/FilmService';
import SubmitCancelButtons from '../General/SubmitCancelButtons';
import InputDurationFormGroup from '../General/InputDurationFormGroup';
import InputDateFormGroup from '../General/InputDateFormGroup';
import validationService from '../../Services/ValidationService';
import InputStringFormGroup from '../General/InputStringFormGroup';

export default class FormFilm extends Component{
    displayName = FormFilm.displayName;

    constructor(props){
        super(props);
        this.state={
            name: this.props.filmInfo ? this.props.filmInfo.name : '',
            startDate: this.props.filmInfo ? moment(this.props.filmInfo.startDate) : moment(),
            endDate: this.props.filmInfo ? moment(this.props.filmInfo.endDate) : moment(),
            duration: this.props.filmInfo ? filmService.convertFromSecToDate(this.props.filmInfo.duration) : moment('00:00:00', 'HH:mm:ss'),
            description: this.props.filmInfo ? this.props.filmInfo.description : '',
            showHint: this.props.showHint ? this.props.showHint : false
        }
    }

    handleChangeName = (event) =>{
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
        if (filmService.validateFilmInfo(
            this.state.name,
            this.state.description,
            this.state.startDate,
            this.state.endDate,
            this.state.duration
        )){
            this.props.callBackReceiveFilmInfo({
                name: this.state.name,
                startDate: filmService.formDate(this.state.startDate),
                endDate: filmService.formDate(this.state.endDate),
                duration: filmService.convertFromDateToSec(this.state.duration),
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

    render(){
        return(
            <React.Fragment>
                <h1>
                    Film information
                </h1>
                <InputStringFormGroup
                    isShown={true}
                    label="Name"
                    value={this.state.name}
                    handleValueChange={this.handleChangeName}
                    showHint={this.state.showHint}
                />
                <InputDateFormGroup
                    label="Start date"
                    errorString="Start date is equal or more than end date."
                    handleValueChange={this.handleChangeStartDate}
                    showHint={this.state.showHint}
                    value={this.state.startDate}
                    isValid={validationService.validateStartAndEndDates(this.state.startDate, this.state.endDate)}
                />
                <InputDateFormGroup
                    label="End date"
                    errorString="End date is equal or less than start date."
                    handleValueChange={this.handleChangeEndDate}
                    showHint={this.state.showHint}
                    value={this.state.endDate}
                    isValid={validationService.validateStartAndEndDates(this.state.startDate, this.state.endDate)}
                />
                <InputDurationFormGroup
                    label="Duration"
                    value={this.state.duration}
                    handleValueChange={this.handleChangeDuration}
                    showHint={this.state.showHint}
                />
                <InputStringFormGroup
                    isShown={true}
                    label="Description"
                    value={this.state.description}
                    handleValueChange={this.handleChangeDescription}
                    showHint={this.state.showHint}
                />
                <SubmitCancelButtons
                    handleSubmitClick={this.handleSubmitClick}
                    handleCancelClick={this.handleCancelClick}
                />
            </React.Fragment>
        );
    }
}