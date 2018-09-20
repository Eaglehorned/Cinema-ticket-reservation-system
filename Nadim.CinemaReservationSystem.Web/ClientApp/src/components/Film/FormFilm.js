import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import filmService from '../../Services/FilmService';
import SubmitCancelButtons from '../General/SubmitCancelButtons';
import InputDurationFormGroup from '../General/InputDurationFormGroup';
import InputDateFormGroup from '../General/InputDateFormGroup';
import validationService from '../../Services/ValidationService';
import InputStringFormGroup from '../General/InputStringFormGroup';
import Loading from '../General/Loading';
import applicationService from '../../Services/ApplicationService';

class FormFilm extends Component{
    displayName = FormFilm.displayName;

    constructor(props){
        super(props);
        this.state={
            filmId: undefined,
            name: undefined,
            startDate: undefined,
            endDate: undefined,
            duration: undefined,
            description: undefined,
            showHint: this.props.showHint,
            dataIsLoaded: false
        }
    }

    componentWillMount(){
        if (this.props.match.params.id){
            this.getFilm(this.props.match.params.id)
            .then(() => this.setState({ dataIsLoaded: true }))
            .catch(error => {
                applicationService.informWithErrorMessage(error);
                this.props.callBackReturnToUpperPage();
            });
        }
        else{
            this.setState({ 
                dataIsLoaded: true,
                name: '',
                startDate: moment(),
                endDate: moment(),
                duration: moment('00:00:00', 'HH:mm:ss'),
                description: ''
            });
        }
    }

    getFilm = (filmId) =>{
        return filmService.getFilm(filmId)
        .then(requestedData => {
            this.setState({
                filmId: requestedData.filmId,
                name: requestedData.name,
                startDate: moment(requestedData.startDate),
                endDate: moment(requestedData.endDate),
                duration: filmService.convertFromSecToDate(requestedData.duration),
                description: requestedData.description
            })
        });
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
                filmId: this.state.filmId,
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
        this.props.callBackReturnToUpperPage();
    }

    renderContent = () =>{
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

    render(){
        const content = this.state.dataIsLoaded
        ? this.renderContent()
        : <Loading/>;
        return(
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
}

export default withRouter(FormFilm);