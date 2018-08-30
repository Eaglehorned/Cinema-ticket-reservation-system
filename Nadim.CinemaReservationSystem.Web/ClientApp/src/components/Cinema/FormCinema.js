import React, { Component } from 'react';
import FormGeneralCinemaInfo from './FormGeneralCinemaInfo';
import FormCinemaRoom from './FormCinemaRoom';
import '../../styles/FormCinema.css';
import CinemaService from '../../Services/CinemaService';
import ApplicationService from '../../Services/ApplicationService';
import SubmitCancelButtons from '../General/SubmitCancelButtons';
import DisplayCinemaRoomsList from './DisplayCinemaRoomsList';

export default class FormCinema extends Component{
    displayName = FormCinema.displayName;
    constructor(props){
        super(props);
        this.state={
            cinemaInfo: this.props.cinema ? this.props.cinema.info : undefined,
            cinemaRooms: this.props.cinema ? this.props.cinema.cinemaRooms : [],
            chosenOperation: '',
            chosenCinemaRoomInfo: undefined,
            allowSubmit: true
        };
    }

    getCinemaRoom = (id) =>{
        CinemaService.getCinemaRoom(this.state.cinemaInfo.cinemaId, id)
        .then(cinema => {
            this.setState({
                chosenCinemaRoomInfo: cinema,
                chosenOperation: 'editCinemaRoom'
            });
        })
        .catch(error => {
            this.setState({
                chosenOperation:''
            });
            ApplicationService.informWithErrorMessage(error);
        });
    }

    createCinemaRoom = (cinemaRoomInfo) =>{
        this.setState({
            chosenOperation: ''
        });
        CinemaService.createCinemaRoom(this.state.cinemaInfo.cinemaId, cinemaRoomInfo)
        .then(cinemaRoom => {
            this.setState({
                cinemaRooms: this.state.cinemaRooms.concat(cinemaRoom)
            });
            ApplicationService.informWithMessage('Cinema room created');
        })
        .catch(error => ApplicationService.informWithErrorMessage(error));
    }
    
    editCinemaRoom = (cinemaRoomInfo) =>{
        this.setState({
            chosenOperation: '',
        });
        CinemaService.editCinemaRoom(this.state.cinemaInfo.cinemaId, this.state.chosenCinemaRoomInfo.info.cinemaRoomId, cinemaRoomInfo)
        .then(() => {
            const tempCinemaRooms = this.state.cinemaRooms;
            tempCinemaRooms.find((el) => el.cinemaRoomId === this.state.chosenCinemaRoomInfo.info.cinemaRoomId).name = cinemaRoomInfo.name;
            this.setState({
                cinemaRooms: tempCinemaRooms
            });
            ApplicationService.informWithMessage('Cinema room edited.');
        })
        .catch(error => ApplicationService.informWithErrorMessage(error));
    }

    submitFormCinema = () =>{
        if(this.state.allowSubmit){
            this.props.callBackFromParent(
                this.state.cinemaInfo
            );
        }
    }

    cancelCurrentOperation = () =>{
        this.setState({
            chosenOperation: ''
        })
    }

    handleCinemaInfoChange = (cinemaInfo) =>{
        let tempCinemaInfo = cinemaInfo.info;
        tempCinemaInfo.cinemaId = this.state.cinemaInfo.cinemaId;
        this.setState({
            cinemaInfo: tempCinemaInfo,
            allowSubmit: cinemaInfo.allowSubmit
        });
    }

    handleChooseEditCinemaRoomAction = (cinemaRoomId) =>{
        this.setState({
            chosenOperation: 'editCinemaRoomLoading'
        });
        this.getCinemaRoom(cinemaRoomId);
    }

    handleChooseCreateCinemaRoomAction = () =>{
        this.setState({ chosenOperation: 'createCinemaRoom'});
    }

    renderCinemaActionButtons = () =>{
        return(
            <fieldset>
                <legend>
                    Cinema rooms
                </legend>
                <DisplayCinemaRoomsList
                    list={this.state.cinemaRooms}
                    handleElementClick={this.handleChooseEditCinemaRoomAction}
                    handleListButtonClick={this.handleChooseCreateCinemaRoomAction}
                />
                <SubmitCancelButtons
                    handleSubmitClick={this.submitFormCinema}
                    handleCancelClick={this.props.callBackCancelParentOperation}
                />
            </fieldset>
        )
    }

    renderFormCinemaRoomCreateContent = () =>{
        return(
            <FormCinemaRoom
                callBackReceiveCinemaRoom={this.createCinemaRoom}
                callBackCancel={this.cancelCurrentOperation}
            />
        );
    }

    renderFormCinemaRoomEditContent = () =>{
        return(
            <FormCinemaRoom
                callBackReceiveCinemaRoom={this.editCinemaRoom}
                cinemaRoom={this.state.chosenCinemaRoomInfo}
                callBackCancel={this.cancelCurrentOperation}
            />
        );
    }

    renderFormCreateCinemaContent = () =>{
        return(
            <React.Fragment>
                <h1>Cinema</h1>
                <h2>
                    Input general cinema information
                </h2>
                <FormGeneralCinemaInfo 
                    callBackFromParent={this.props.callBackFromParent}
                    callBackCancel={this.props.callBackCancelParentOperation}
                />
            </React.Fragment>
        );
    }

    renderCinemaInfoAndActionsContent = () =>{
        return (
            <React.Fragment>
                <h1>Cinema</h1>
                <div className="form-cinema-room-container cinema-room-information-container">
                <h2>Cinema information</h2>
                    <FormGeneralCinemaInfo         
                        callBackHandleInfoChange={this.handleCinemaInfoChange}
                        cinemaInfo={this.state.cinemaInfo}
                        displayedComponents={{
                            city: true,
                            name: true,
                            buttons: false
                        }}
                        needToShowHint={true}
                    />
                </div>
                <div className="form-cinema-room-container cinema-room-buttons-container">
                    {this.renderCinemaActionButtons()}
                </div>
            </React.Fragment>
        );
    }

    renderComponentContent = () =>{
        //If we are creating new cinema
        if (!this.state.cinemaInfo){
            return this.renderFormCreateCinemaContent();
        }
        //if we have opened existing cinema
        switch(this.state.chosenOperation){
            case 'createCinemaRoom':
                return this.renderFormCinemaRoomCreateContent();
            case 'editCinemaRoomLoading':
                return(
                    <div className="font-x-large font-italic">
                        Loading...
                    </div>
                );
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