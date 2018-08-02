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
            chosenOperation: '',
            modalIsOpen: false,
            seatToChangeType: {}
        }
        this.createSeatsArray = this.createSeatsArray.bind(this);
        this.changeSeatType = this.changeSeatType.bind(this);
        this.closeModal= this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.submitSeatTypeChange = this.submitSeatTypeChange.bind(this);
        this.submitCinemaRoomSeats = this.submitCinemaRoomSeats.bind(this);
        this.submitChangeName = this.submitChangeName.bind(this);
        this.renderFormCinemaRoomContent = this.renderFormCinemaRoomContent.bind(this);
        this.renderFormCinemaRoomInfoContent = this.renderFormCinemaRoomInfoContent.bind(this);
        this.renderCinemaRoomInfoAndActionsContent = this.renderCinemaRoomInfoAndActionsContent.bind(this);
        this.renderCinemaActionButtons = this.renderCinemaActionButtons.bind(this);
        this.renderChangeCinemaRoomNameContent = this.renderChangeCinemaRoomNameContent.bind(this);
        this.renderCinemaRoomChangeSeatsSchemeContent = this.renderCinemaRoomChangeSeatsSchemeContent.bind(this);
        this.cancelFormCinemaRoom = this.cancelFormCinemaRoom.bind(this);
        this.cancelCurrentOperation = this.cancelCurrentOperation.bind(this);
    }

    cancelFormCinemaRoom(){
        this.props.callBackCancel();
    }

    cancelCurrentOperation(){
        this.setState({
            chosenOperation: ''
        })
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
            chosenOperation: ''
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

    submitCinemaRoomSeats(){
        this.setState({
            chosenOperation:''
        });
    }

    submitChangeName(cinemaInfo){
        let tempInfo = this.state.cinemaRoomInfo;
        tempInfo.name = cinemaInfo.name;
        this.setState({
            cinemaRoomInfo: tempInfo,
            chosenOperation: ''
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

    renderChangeCinemaRoomNameContent(){
        return(
            <React.Fragment>
                <FormCinemaRoomInfo
                    callBackReceiveCinemaRoomInfo={this.submitChangeName}
                    callBackCancel={this.cancelCurrentOperation}
                    displayedComponents={{name: true}}
                />
            </React.Fragment>
        );
    }

    renderCinemaActionButtons(){
        return(
            <React.Fragment>
                <fieldset>
                    <legend>
                        Cinema room information
                    </legend>
                    <Button
                        onClick={()=>this.setState({chosenOperation: 'changeCinemaRoomName'})}
                    >
                        Change cinema name
                    </Button>
                </fieldset>
                <fieldset>
                    <legend>
                        Cinema room seats
                    </legend>
                    <Button
                        onClick={() => this.setState({ chosenOperation: 'editCinemaRoomTypesOfSeats'})}
                    >
                        Change seats types
                    </Button>
                    <Button
                        onClick={() => this.setState({chosenOperation: 'editCinemaRoomSeatsScheme'})}
                    >
                        Change seats scheme
                    </Button>
                </fieldset>
                <fieldset className="concluding-buttons">
                    <Button
                        //TODO return cinema room
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={this.cancelFormCinemaRoom}
                    >
                        Cancel
                    </Button>
                </fieldset>
            </React.Fragment>
        );
    }

    renderCinemaRoomChangeSeatsSchemeContent(){
        return(
            <React.Fragment>
                    <FormCinemaRoomInfo
                        callBackReceiveCinemaRoomInfo={this.createSeatsArray}
                        callBackCancel={this.cancelCurrentOperation}
                        displayedComponents={{
                            rows: true, 
                            columns: true
                        }}
                        cinemaRoomInfo={this.state.cinemaRoomInfo}
                    />
            </React.Fragment>
        );
    }

    renderCinemaRoomInfoAndActionsContent(){
        return(
            <React.Fragment>
                <h1>Cinema room</h1>
                <div className="form-cinema-room-container cinema-room-information-container">
                    <h2>Cinema room information</h2>
                    <div className="font-x-large">
                        <span className="font-bold"> Name : </span>{this.state.cinemaRoomInfo.name}
                    </div>
                    <div className="font-x-large">
                        <span className="font-bold"> Number of rows : </span>{this.state.cinemaRoomInfo.rows}
                    </div>
                    <div className="font-x-large">
                        <span className="font-bold"> Number of columns : </span>{this.state.cinemaRoomInfo.columns}
                    </div>
                        <SeatsScheme
                            seatsArray={this.state.cinemaRoomSeats}
                            callBackFromParent={()=>{}}
                            mode="display"
                        />
                </div>
                <div className="form-cinema-room-container cinema-room-buttons-container">
                    {this.renderCinemaActionButtons()}
                </div>
            </React.Fragment>
        );      
    }

    renderCinemaRoomChangeSeatTypesContent(){
        return(
            <SeatsScheme
                seatsArray={this.state.cinemaRoomSeats}
                callBackFromParent={this.changeSeatType}
                callBackSubmit={this.submitCinemaRoomSeats}
            />
        );
    }

    renderFormCinemaRoomContent(){
        console.log(this.state.chosenOperation);
        if(!this.state.cinemaRoomInfo){
            return this.renderFormCinemaRoomInfoContent();
        }
        switch(this.state.chosenOperation){
            case 'changeCinemaRoomName':
                return this.renderChangeCinemaRoomNameContent();
            case 'editCinemaRoomTypesOfSeats':
                return this.renderCinemaRoomChangeSeatTypesContent();
            case 'editCinemaRoomSeatsScheme':
                return this.renderCinemaRoomChangeSeatsSchemeContent();
            default:
                return this.renderCinemaRoomInfoAndActionsContent();
            
        }
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