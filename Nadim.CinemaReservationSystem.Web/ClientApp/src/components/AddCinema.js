import React, { Component } from 'react';
import AddCinemaInfo from './AddCinemaInfo';
import SeatsSchemeForCreation from './SeatsSchemeForCreation';
import SeatTypeChange from './SeatTypeChange';
import Modal from 'react-modal';
import '../styles/AddCinema.css';

export default class AddCinema extends Component {
    displayName = AddCinema.name;

    constructor(props) {
        super(props);
        this.state={
            cinemaInfoInputted: false,
            seatsArray: [],
            cinemaInfo: {},
            modalIsOpen: false,
            seatInfoToTypeChange: {},
            error: '',
        }
        this.handleCinemaInfoInput = this.handleCinemaInfoInput.bind(this);
        this.handleSeatTypeChange = this.handleSeatTypeChange.bind(this);
        this.closeModal= this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleSubmitSeatTypeChange = this.handleSubmitSeatTypeChange.bind(this);
        this.handleCancelCinemaDataInput = this.handleCancelCinemaDataInput.bind(this);
        this.handleCreateCinema = this.handleCreateCinema.bind(this);
        this.clearState = this.clearState.bind(this);
        this.clearErrorState = this.clearErrorState.bind(this);
    }

    handleCinemaInfoInput(cinemaData){
        let seatsArray = [];
        for (var i = 0; i < cinemaData.cinemaRoomRows; i++){
            seatsArray[i] = [];
            for (var j = 0; j < cinemaData.cinemaRoomColumns; j++) {
                seatsArray[i].push({
                    row: i,
                    column: j,
                    type:'default'
                });
            }
        }
        this.setState({
            seatsArray: seatsArray,
            cinemaInfoInputted: true,
            cinemaInfo: cinemaData
        })
    }

    handleSeatTypeChange(dataToChangeSeatType){
        this.setState({
            modalIsOpen: true,
            seatInfoToTypeChange: dataToChangeSeatType,
        })
    }

    handleSubmitSeatTypeChange(newSeatType){
        if (newSeatType != this.state.seatInfoToTypeChange.type ){
           let tempSeatsArray = this.state.seatsArray;
           tempSeatsArray[this.state.seatInfoToTypeChange.row][this.state.seatInfoToTypeChange.column].type = newSeatType;
           this.setState({
               seatsArray: tempSeatsArray,
           });
       }
        this.closeModal();
    }

    handleCancelCinemaDataInput(){
        this.clearState();
    }

    handleCreateCinema(){
        console.log(this.props.token);
        fetch('api/Cinema/AddCinema', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.props.token,
            },
            body: JSON.stringify({
                city: this.state.cinemaInfo.city,
                name: this.state.cinemaInfo.name,
                cinemaRoomsCount: this.state.cinemaInfo.cinemaRoomsCount,
                seats: [].concat(...this.state.seatsArray),
                username: this.props.username,
                vipSeatPrice: this.state.cinemaInfo.vipPrice,
                defaultSeatPrice: this.state.cinemaInfo.defaultPrice,
            })
        }).then(response => response.json())
            .then(parsedJson => {
                if (parsedJson.resultOk){
                    //TODO: inform parent cinema created
                }
                else {
                    this.clearState();
                    this.setState({
                        error: parsedJson.details,
                    })
                }
            })
    }

    clearState(){
        this.setState({
            cinemaInfoInputted: false,
            seatsArray: [],
            cinemaInfo: {},
            modalIsOpen: false,
            seatInfoToTypeChange: {},
        });
    }

    clearErrorState(){
        this.setState({
            error: '',
        })
    }

    closeModal(){
        this.setState({
            modalIsOpen: false
        })
    }

    openModal(){
        this.setState({
            modalIsOpen: true
        })
    }

    render(){
        let content = this.state.cinemaInfoInputted ? 
            <SeatsSchemeForCreation 
                seatsArray={this.state.seatsArray} 
                callBackFromParent={this.handleSeatTypeChange}
                callBackCancelCinemaDataInput={this.handleCancelCinemaDataInput}
                callBackCreateCinema={this.handleCreateCinema}
            /> :
            <AddCinemaInfo 
                callBackFromParent={this.handleCinemaInfoInput}
                callBackClearErrorState={this.clearErrorState}
            /> ;
        return(
            <div>
                <div className="add-cinema-container">
                <h1>Add Cinema</h1>
                <h3 className="error-text">
                    {this.state.error}
                </h3>
                    {content}
                </div>
                <div>
                    <Modal     
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        ariaHideApp={false}
                        className="add-cinema-Modal"
                    >
                        <SeatTypeChange 
                            seatInfo={this.state.seatInfoToTypeChange}
                            callBackSubmitSeatTypeChange={this.handleSubmitSeatTypeChange}
                            callBackCancelSeatTypeChange={this.closeModal}
                        />
                    </Modal>
                </div>
            </div>
        )
    }
}