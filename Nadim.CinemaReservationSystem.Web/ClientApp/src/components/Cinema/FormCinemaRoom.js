import React, {Component} from 'react';
import FormCinemaRoomInfo from './FormCinemaRoomInfo';
import SubmitCancelButtons from '../General/SubmitCancelButtons';
import ChangeCinemaRoomInfoComponents from './ChangeCinemaRoomInfoComponents';
import ChangeSeatTypeModal from './ChangeSeatTypeModal';
import seatsHelper from '../../Helper/SeatsHelper';

export default class FormCinemaRoom extends Component{
    displayName = FormCinemaRoom.displayName;

    constructor(props){
        super(props);
        this.state={
            cinemaRoomInfo: this.props.cinemaRoom ? this.props.cinemaRoom.info : undefined,
            cinemaRoomSeats: this.props.cinemaRoom ? this.props.cinemaRoom.seats : undefined,
            modalIsOpen: false,
            seatToChangeType: {},
            allowSubmit: true
        }
    }

    returnCinemaRoom = () =>{
        if (this.state.allowSubmit){
            this.props.callBackReceiveCinemaRoom({
                name: this.state.cinemaRoomInfo.name,
                cinemaRoomSeats: this.state.cinemaRoomSeats
            });
        }
    }

    cancelFormCinemaRoom = () =>{
        this.props.callBackCancel();
    }

    createSeatsArray = (cinemaRoomInfo) =>{
        cinemaRoomInfo.name = this.state.cinemaRoomInfo ? this.state.cinemaRoomInfo.name : cinemaRoomInfo.name;
        this.setState({
            cinemaRoomInfo: cinemaRoomInfo,
            cinemaRoomSeats: seatsHelper.createSeatsArray(cinemaRoomInfo.rows, cinemaRoomInfo.columns),
        });
    }

    changeSeatType = (dataToChangeSeatType) =>{
        this.setState({
            modalIsOpen: true,
            seatToChangeType: dataToChangeSeatType
        })
    }

    submitSeatTypeChange = (newSeatType) =>{
        if (newSeatType !== this.state.seatToChangeType.type ){
            let tempSeatsArray = this.state.cinemaRoomSeats;
            tempSeatsArray[this.state.seatToChangeType.row][this.state.seatToChangeType.column].type = newSeatType;
            this.setState({
                cinemaRoomSeats: tempSeatsArray
            });
       }
        this.closeModal();
    }

    closeModal = () =>{
        this.setState({
            modalIsOpen: false
        });
    }

    openModal = () =>{
        this.setState({
            modalIsOpen: true
        });
    }

    handleChangeCinemaRoomNameInfo = (cinemaRoomInfo) =>{
        let tempCinemaRoomInfo = this.state.cinemaRoomInfo;
        tempCinemaRoomInfo.name = cinemaRoomInfo.info.name;
        this.setState({
            allowSubmit: cinemaRoomInfo.allowSubmit,
            cinemaRoomInfo: tempCinemaRoomInfo
        });
    }

    renderFormCinemaRoomInfoContent = () =>{
        return(
            <React.Fragment>
                <h1>Cinema room</h1>
                <FormCinemaRoomInfo
                    callBackReceiveCinemaRoomInfo={this.createSeatsArray}
                    callBackCancel={this.cancelFormCinemaRoom}
                />  
            </React.Fragment> 
        );
    }

    renderCinemaActionButtons = () =>{
        return(
            <fieldset>
                <legend>
                    Cinema room
                </legend>
                <SubmitCancelButtons
                    handleSubmitClick={this.returnCinemaRoom}
                    handleCancelClick={this.cancelFormCinemaRoom}
                />
            </fieldset>
        );
    }

    renderCinemaRoomChangeInfoContent = () =>{
        return(
            <ChangeCinemaRoomInfoComponents
                handleChangeCinemaRoomNameInfo={this.handleChangeCinemaRoomNameInfo}
                cinemaRoomInfo={this.state.cinemaRoomInfo}
                createSeatsArray={this.createSeatsArray}
                cinemaRoomSeats={this.state.cinemaRoomSeats}
                changeSeatType={this.changeSeatType}
                submitCinemaRoomSeats={this.submitCinemaRoomSeats}
            />
        );
    }

    renderCinemaRoomInfoAndActionsContent = () =>{
        return(
            <React.Fragment>
                <h1>Cinema room</h1>
                <div className="form-cinema-room-container cinema-room-information-container">
                    <h2>Cinema room information</h2>
                    {this.renderCinemaRoomChangeInfoContent()}
                </div>
                <div className="form-cinema-room-container cinema-room-buttons-container">
                    {this.renderCinemaActionButtons()}
                </div>
            </React.Fragment>
        );      
    }

    renderFormCinemaRoomContent = () =>{
        if(!this.state.cinemaRoomInfo){
            return this.renderFormCinemaRoomInfoContent();
        }
        return this.renderCinemaRoomInfoAndActionsContent();
    }

    render(){
        const content = this.renderFormCinemaRoomContent();

        return(
            <div>
                {content}
                <ChangeSeatTypeModal
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}
                    seatToChangeType={this.state.seatToChangeType}
                    submitSeatTypeChange={this.submitSeatTypeChange}
                />
            </div>
        )
    }
}