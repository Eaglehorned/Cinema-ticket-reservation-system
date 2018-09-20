import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CinemaService from '../../Services/CinemaService';
import applicationService from '../../Services/ApplicationService';
import FilmService from '../../Services/FilmService';
import moment from 'moment';
import sessionService from '../../Services/SessionService';
import InputFutureDateFormGroup from '../General/InputFutureDateFormGroup';
import InputTimeFormGroup from '../General/InputTimeFormGroup';
import ChooseCinemaWithDropDown from '../Cinema/ChooseCinemaWithDropDown';
import SubmitCancelButtons from '../General/SubmitCancelButtons';
import ChooseCinemaRoomWithDropDown from '../Cinema/ChooseCinemaRoomWithDropDown';
import ChooseFilmWithDropDown from '../Film/ChooseFilmWithDropDown';
import DisplaySeatTypesList from './DisplaySeatTypesList';
import Loading from '../General/Loading';
import '../../styles/Session.css';

class FormSession extends Component{
    displayName = FormSession.displayName;

    constructor(props){
        super(props);
        this.state={
            beginTime: moment(),
            cinemaList: [],
            chosenCinema: undefined,
            chosenCinemaRoomsList: [],
            chosenCinemaRoom: undefined,
            filmList: [],
            chosenFilm: undefined,
            seatTypes: [],
            showHint: this.props.sessionInfo ? true : false,
            dataIsLoaded: false,
            sessionId: undefined
        }
    }

    componentWillMount(){
        this.getCinemaList();
        this.getFilmList();

        if (this.props.match.params.id){
            this.getSession(this.props.match.params.id)        
            .then(() => this.getCinemaRoomList(this.state.chosenCinema.cinemaId))
            .then(() => this.setState({ dataIsLoaded: true }))
            .catch(error => {
                applicationService.informWithErrorMessage(error);
                this.props.callBackReturnToUpperPage();
            });
        }
        else{
            this.setState({ 
                dataIsLoaded: true
            });
        }  
    }

    getSession = (sessionId) =>{
        return sessionService.getSession(sessionId)
        .then(requestedData => {
            this.setState({
                sessionId: requestedData.sessionId,
                beginTime: moment(requestedData.beginTime),
                chosenCinema: requestedData.cinema,
                chosenCinemaRoom: requestedData.cinemaRoom,
                chosenFilm: requestedData.film,
                seatTypes: requestedData.sessionSeatTypePrices
            })
        });
    }

    getCinemaList = () =>{ 
        return CinemaService.getCinemaList()
        .then(requestedData => {
            this.setState({
                cinemaList: requestedData
            });
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    getCinemaRoomList = (cinemaId) =>{
        CinemaService.getCinemaRoomList(cinemaId)
        .then(requestedData => {
            this.setState({
                chosenCinemaRoomsList: requestedData
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
        FilmService.getFilmList()
        .then(requestedData => {
            this.setState({
                filmList: requestedData,
            });
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    getSeatTypes = (cinemaRoomId) => {
        CinemaService.getCinemaRoomSeatTypes(this.state.chosenCinema.cinemaId, cinemaRoomId)
        .then(requestedData => {
            this.setState({
                seatTypes: requestedData.map((el) => {
                     el.price = ''; 
                     return el;
                    })
            });
        })
        .catch(error => applicationService.informWithErrorMessage(error));
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
        this.setState({
            seatTypes: sessionService.updateSeatTypesList(this.state.seatTypes, seatTypeInfo)
        });
    }

    handleSubmitClick = () =>{
        if (
            sessionService.validateSessionInfo(
                this.state.chosenCinema,
                this.state.chosenCinemaRoom,
                this.state.chosenFilm,
                this.state.beginTime,
                this.state.seatTypes
            )
        ){
            this.props.callBackReceiveSessionInfo({
                sessionId: this.state.sessionId,
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
        this.props.callBackReturnToUpperPage();
    }

    renderGeneralInfoInputContent = () =>{
        return(
            <fieldset>
                <ChooseCinemaWithDropDown
                    showHint={this.state.showHint}
                    chosenCinema={this.state.chosenCinema}
                    list={this.state.cinemaList}
                    handleElementSelect={this.handleSelectCinema}
                />
                <ChooseCinemaRoomWithDropDown
                    showHint={this.state.showHint}
                    chosenCinemaRoom={this.state.chosenCinemaRoom}
                    list={this.state.chosenCinemaRoomsList}
                    handleElementSelect={this.handleSelectCinemaRoom}
                />
                <ChooseFilmWithDropDown
                    showHint={this.state.showHint}
                    chosenFilm={this.state.chosenFilm}
                    list={this.state.filmList}
                    handleElementSelect={this.handleSelectFilm}
                />
                <InputFutureDateFormGroup
                    label="Begin date"
                    value={this.state.beginTime}
                    handleValueChange={this.handleChangeBeginTime}
                    showHint={this.state.showHint}
                />
                <InputTimeFormGroup
                    label="Time"
                    value={this.state.beginTime}
                    handleValueChange={this.handleChangeBeginTime}
                    showHint={this.state.showHint}
                />
            </fieldset>
        );
    }

    renderSetSeatTypePrices = () =>{
        return(
            <React.Fragment>
                <DisplaySeatTypesList
                    showHint={this.state.showHint}
                    handleElementChange={this.handleChangePrice}
                    list={this.state.seatTypes}
                />
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

export default withRouter(FormSession);