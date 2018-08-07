import React, {Component} from 'react';
import FormCinemaRoomInfo from './FormCinemaRoomInfo';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import SeatsScheme from './SeatsScheme';
import SeatTypeChange from './SeatTypeChange';

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
        this.returnCinemaRoom = this.returnCinemaRoom.bind(this);
        this.createSeatsArray = this.createSeatsArray.bind(this);
        this.changeSeatType = this.changeSeatType.bind(this);
        this.closeModal= this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.submitSeatTypeChange = this.submitSeatTypeChange.bind(this);
        this.submitChangeName = this.submitChangeName.bind(this);
        this.cancelFormCinemaRoom = this.cancelFormCinemaRoom.bind(this);
        this.handleChangeCinemaRoomNameInfo = this.handleChangeCinemaRoomNameInfo.bind(this);
        this.renderFormCinemaRoomContent = this.renderFormCinemaRoomContent.bind(this);
        this.renderFormCinemaRoomInfoContent = this.renderFormCinemaRoomInfoContent.bind(this);
        this.renderCinemaRoomInfoAndActionsContent = this.renderCinemaRoomInfoAndActionsContent.bind(this);
        this.renderCinemaActionButtons = this.renderCinemaActionButtons.bind(this);
    }

    returnCinemaRoom(){
        if (this.state.allowSubmit){
            this.props.callBackReceiveCinemaRoom({
                name: this.state.cinemaRoomInfo.name,
                cinemaRoomSeats: this.state.cinemaRoomSeats
            });
        }
    }

    cancelFormCinemaRoom(){
        this.props.callBackCancel();
    }

    createSeatsArray(cinemaRoomInfo){
        let seatsArray = [];
        for (let i = 0; i < cinemaRoomInfo.rows; i++){
            seatsArray[i] = [];
            for (let j = 0; j < cinemaRoomInfo.columns; j++) {
                seatsArray[i].push({
                    row: i,
                    column: j,
                    type:'default'
                });
            }
        }
        this.setState({
            cinemaRoomInfo: cinemaRoomInfo,
            cinemaRoomSeats: seatsArray,
        });
    }

    changeSeatType(dataToChangeSeatType){
        this.setState({
            modalIsOpen: true,
            seatToChangeType: dataToChangeSeatType
        })
    }

    submitSeatTypeChange(newSeatType){
        if (newSeatType !== this.state.seatToChangeType.type ){
            let tempSeatsArray = this.state.cinemaRoomSeats;
            tempSeatsArray[this.state.seatToChangeType.row][this.state.seatToChangeType.column].type = newSeatType;
            this.setState({
                cinemaRoomSeats: tempSeatsArray
            });
       }
        this.closeModal();
    }

    submitChangeName(cinemaInfo){
        let tempInfo = this.state.cinemaRoomInfo;
        tempInfo.name = cinemaInfo.info.name;
        this.setState({
            cinemaRoomInfo: tempInfo,
        });
    }

    closeModal(){
        this.setState({
            modalIsOpen: false
        });
    }

    openModal(){
        this.setState({
            modalIsOpen: true
        });
    }

    handleChangeCinemaRoomNameInfo(cinemaRoomInfo){
        let tempCinemaRoomInfo = this.state.cinemaRoomInfo;
        tempCinemaRoomInfo.name = cinemaRoomInfo.info.name;
        this.setState({
            allowSubmit: cinemaRoomInfo.allowSubmit,
            cinemaRoomInfo: tempCinemaRoomInfo
        });
    }

    renderFormCinemaRoomInfoContent(){
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

    renderCinemaActionButtons(){
        return(
            <fieldset>
                <legend>
                    Cinema room
                </legend>
                <Button
                    onClick={this.returnCinemaRoom}
                    bsStyle="primary"
                >
                    Submit
                </Button>
                <Button
                    onClick={this.cancelFormCinemaRoom}
                >
                    Cancel
                </Button>
            </fieldset>
        );
    }

    renderCinemaRoomInfoAndActionsContent(){
        return(
            <React.Fragment>
                <h1>Cinema room</h1>
                <div className="form-cinema-room-container cinema-room-information-container">
                    <h2>Cinema room information</h2>
                    <fieldset className="form-group">
                        <legend>
                            Cinema room name
                        </legend>
                        <FormCinemaRoomInfo
                            callBackHandleChangeCinemaRoomInfo={this.handleChangeCinemaRoomNameInfo}
                            cinemaRoomInfo={this.state.cinemaRoomInfo}
                            displayedComponents={{name: true}}
                            needToShowHint={true}
                        />
                    </fieldset>
                    <fieldset className="form-group">
                    <legend>
                        Edit seats scheme name
                    </legend>
                        <FormCinemaRoomInfo
                            callBackReceiveCinemaRoomInfo={this.createSeatsArray}
                            displayedComponents={{
                                rows: true, 
                                columns: true,
                                submit: true
                            }}
                            cinemaRoomInfo={this.state.cinemaRoomInfo}
                            needToShowHint={true}
                        />
                    </fieldset>
                    <fieldset className="form-group">
                    <legend>
                        Change seat types
                    </legend>
                        <SeatsScheme
                            seatsArray={this.state.cinemaRoomSeats}
                            callBackFromParent={this.changeSeatType}
                            callBackSubmit={this.submitCinemaRoomSeats}
                            mode="display"
                        />
                    </fieldset>
                </div>
                <div className="form-cinema-room-container cinema-room-buttons-container">
                    {this.renderCinemaActionButtons()}
                </div>
            </React.Fragment>
        );      
    }

    renderFormCinemaRoomContent(){
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
                <Modal     
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                    className="add-cinema-Modal"
                >
                    <SeatTypeChange
                        seatInfo={this.state.seatToChangeType}
                        callBackSubmitSeatTypeChange={this.submitSeatTypeChange}
                    />
                </Modal>
            </div>
        )
    }
}