import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import FormGeneralCinemaInfo from './FormGeneralCinemaInfo';
import FormCinemaRoom from './FormCinemaRoom';
import '../../styles/FormCinema.css';
import CinemaService from '../../Services/CinemaService';
import ApplicationService from '../../Services/ApplicationService';
import ListItem from '../ListItem';

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
        
        this.cancelCreateCinema = this.cancelCreateCinema.bind(this);
        this.cancelCurrentOperation = this.cancelCurrentOperation.bind(this);
        this.submitFormCinema = this.submitFormCinema.bind(this);
        this.editCinemaInfo = this.editCinemaInfo.bind(this);
        this.createCinemaRoom = this.createCinemaRoom.bind(this);
        this.editCinemaRoom = this.editCinemaRoom.bind(this);
        this.handleCinemaCreateGeneralInfo = this.handleCinemaCreateGeneralInfo.bind(this);
        this.renderFormCreateCinemaContent = this.renderFormCreateCinemaContent.bind(this);
        this.renderCinemaInfoAndActionsContent = this.renderCinemaInfoAndActionsContent.bind(this);
        this.renderCinemaActionButtons = this.renderCinemaActionButtons.bind(this);
        this.renderComponentContent = this.renderComponentContent.bind(this);
        this.renderFormCinemaRoomCreateContent = this.renderFormCinemaRoomCreateContent.bind(this);
        this.renderFormCinemaRoomEditContent = this.renderFormCinemaRoomEditContent.bind(this);
        this.handleCinemaInfoChange = this.handleCinemaInfoChange.bind(this);
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

    createCinemaRoom(cinemaRoomInfo){
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
    
    editCinemaRoom(cinemaRoomData){
        fetch(`api/cinemas/${this.state.cinemaInfo.cinemaId}/cinemaRooms/${this.state.chosenCinemaRoomInfo.info.cinemaRoomId}`, {
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify({
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
                    throw new Error('You need to authorize to do that action.');
                }
                if (response.status === 404){
                    return response.json().then((err) => {
                        throw new Error(`Not found. ${err.details}`);
                    });
                }
            }).then(parsedJson => {
                let tempCinemaRooms = this.state.cinemaRooms;
                tempCinemaRooms.find((el) => el.cinemaRoomId === this.state.chosenCinemaRoomInfo.info.cinemaRoomId).name = cinemaRoomData.name;
                this.setState({
                    cinemaRooms: tempCinemaRooms
                });
                this.props.callBackInformWithMessage('Cinema room edited.');
            })
            .catch(error => this.props.callBackInformWithMessage(
                { 
                    text: error.message,
                    isError: true
                }
            ));
            this.setState({
                chosenOperation: '',
            });
    }

    editCinemaInfo(receivedCinemaInfo){
        fetch(`api/cinemas/${this.state.cinemaInfo.cinemaId}/info`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify(receivedCinemaInfo)
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
                throw new Error('You need to authorize to do that action.');
            }
            if (response.status === 404){
                return response.json().then((err) => {
                    throw new Error(`Not found. ${err.details}`);
                });
            }
        }).then(parsedJson => {
                this.props.callBackInformWithMessage('Cinema information edited.');
            })
            .catch(error => this.props.callBackInformWithMessage(
                { 
                    text: error.message,
                    isError: true
                }
            ));
            this.setState({
                chosenOperation: ''
            });
    }

    cancelCreateCinema(){
        this.props.callBackCancelCreateCinema();
    }

    submitFormCinema(){
        if(this.state.allowSubmit){
            this.editCinemaInfo(this.state.cinemaInfo);
            this.props.callBackFormCinemaInfo({
                cinemaId: this.state.cinemaInfo.cinemaId,
                name: this.state.cinemaInfo.name,
                city: this.state.cinemaInfo.city
            });
        }
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

    handleCinemaInfoChange(cinemaInfo){
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

    renderCinemaActionButtons(){
        return(
            <React.Fragment>
                <fieldset>
                    <legend>
                        Cinema rooms
                    </legend>
                    {
                        this.state.cinemaRooms.map((el)=>
                            <ListItem
                                key={el.cinemaRoomId}
                                params={[
                                    {label:"Name", value: el.name}
                                ]}
                                callBackFromParent={this.handleChooseEditCinemaRoomAction}
                                id={el.cinemaRoomId}
                                mode="edit"
                            />
                        )
                    }
                    <div className="buttons-for-list"> 
                        <Button
                            onClick={() => this.setState({ chosenOperation: 'createCinemaRoom'})}
                        >
                            Add cinema room
                        </Button>
                    </div>
                </fieldset>
                <fieldset className="concluding-buttons">
                    <Button
                        onClick={this.submitFormCinema}
                        bsStyle="primary"
                    >
                        Back
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
                callBackReceiveCinemaRoom={this.editCinemaRoom}
                cinemaRoom={this.state.chosenCinemaRoomInfo}
                callBackCancel={this.cancelCurrentOperation}
            />
        );
    }

    renderFormCreateCinemaContent(){
        return(
            <React.Fragment>
                <h1>Cinema</h1>
                <h2>
                    Input general cinema information
                </h2>
                <FormGeneralCinemaInfo 
                    callBackFromParent={this.handleCinemaCreateGeneralInfo}
                    callBackCancel={this.cancelCreateCinema}
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
                    <FormGeneralCinemaInfo         
                        callBackHandleInfoChange={this.handleCinemaInfoChange}
                        cinemaInfo={this.state.cinemaInfo}
                        displayedComponents={{
                            city: true,
                            name: true,
                            submit: false,
                            cancel: false
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

    renderComponentContent(){
        if (!this.state.cinemaInfo){
            return this.renderFormCreateCinemaContent();
        }
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