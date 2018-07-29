import React, {Component} from 'react';
import FormCinemaRoomInfo from './FormCinemaRoomInfo';
import SeatsSchemeForCreation from './SeatsSchemeForCreation';
import SeatTypeChange from './SeatTypeChange';
import Modal from 'react-modal';

export default class FormCinemaRooms extends Component{
    displayName = FormCinemaRooms.displayName;

    constructor(props){
        super(props);
        this.state={
            cinemaRoomsArray: [],
            currentCinemaRoomId: 0,
            modalIsOpen: false,
            seatInfoToTypeChange: {},
        }
        this.createSeatsArray = this.createSeatsArray.bind(this);
        this.handleSeatTypeChange = this.handleSeatTypeChange.bind(this);
        this.handleSubmitSeatTypeChange = this.handleSubmitSeatTypeChange.bind(this);
        this.handleSubmitCinemaRoomInfoInput = this.handleSubmitCinemaRoomInfoInput.bind(this);
        this.closeModal= this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleCancelCinemaRoomInfoInput = this.handleCancelCinemaRoomInfoInput.bind(this);
    }
    
    createSeatsArray(cinemaRoomInfo){
        let seatsArray = [];
        let tempCinemaRoomsArray = this.state.cinemaRoomsArray;
        for (var i = 0; i < cinemaRoomInfo.rows; i++){
            seatsArray[i] = [];
            for (var j = 0; j < cinemaRoomInfo.columns; j++) {
                seatsArray[i].push({
                    row: i,
                    column: j,
                    type:'default'
                });
            }
        }
        tempCinemaRoomsArray[this.state.currentCinemaRoomId] = {
            "seatsArray" : seatsArray,
            "name" : cinemaRoomInfo.name
        };
        this.setState({
            cinemaRoomsArray: tempCinemaRoomsArray,
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
            let tempSeatsArray = this.state.cinemaRoomsArray[this.state.currentCinemaRoomId].seatsArray;
            tempSeatsArray[this.state.seatInfoToTypeChange.row][this.state.seatInfoToTypeChange.column].type = newSeatType;
            let tempCinemaRoomsArray = this.state.cinemaRoomsArray;
            tempCinemaRoomsArray[this.state.currentCinemaRoomId].seatsArray = tempSeatsArray;
            this.setState({
                cinemaRoomsArray: tempCinemaRoomsArray,
            });
       }
        this.closeModal();
    }

    handleSubmitCinemaRoomInfoInput(){
        this.setState({
            currentCinemaRoomId: this.state.currentCinemaRoomId + 1,
        });
        if (this.state.currentCinemaRoomId === this.props.cinemaRoomsCount - 1){
            let tempCinemaRoomsArray = this.state.cinemaRoomsArray;
            for (var i=0; i < tempCinemaRoomsArray.length; i++){
                tempCinemaRoomsArray[i].seats = [].concat(...tempCinemaRoomsArray[i].seatsArray);
                delete tempCinemaRoomsArray[i].seatsArray;
            }
            console.log(tempCinemaRoomsArray);
            this.props.callBackReceiveCinemaRoomsInfo(tempCinemaRoomsArray);
        }
    }

    handleCancelCinemaRoomInfoInput(){
        if (this.state.cinemaRoomsArray[this.state.currentCinemaRoomId]){
            let tempCinemaRoomsArray = this.state.cinemaRoomsArray;
            delete tempCinemaRoomsArray[this.state.currentCinemaRoomId];
            this.setState({
                cinemaRoomsArray: tempCinemaRoomsArray,
            })
        }
        else{
            if (this.state.currentCinemaRoomId === 0){
                this.props.callBackCancelCinemaRoomsInfoInput();
            }

            this.setState({
                currentCinemaRoomId: this.state.currentCinemaRoomId - 1,
            })
        }
        console.log(this.state.cinemaRoomsArray);
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
        let content = this.state.cinemaRoomsArray[this.state.currentCinemaRoomId] ?
            <SeatsSchemeForCreation 
                seatsArray={this.state.cinemaRoomsArray[this.state.currentCinemaRoomId].seatsArray}
                callBackFromParent={this.handleSeatTypeChange}
                callBackSubmit={this.handleSubmitCinemaRoomInfoInput}
                callBackCancel={this.handleCancelCinemaRoomInfoInput}
            />  : 
            <FormCinemaRoomInfo 
                callBackReceiveCinemaRoomInfo={this.createSeatsArray}
                callBackCancel={this.handleCancelCinemaRoomInfoInput}
            />;
        return(
            <div>
                {content}
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