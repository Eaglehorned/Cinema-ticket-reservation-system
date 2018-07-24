import React, { Component } from 'react';
import AddCinemaInfo from './AddCinemaInfo';
import SeatsSchemeForCreation from './SeatsSchemeForCreation';
import '../styles/AddCinema.css';
import Modal from 'react-modal';

export default class AddCinema extends Component {
    displayName = AddCinema.name;

    constructor(props) {
        super(props);
        this.state={
            cinemaInfoInputted: false,
            seatsArray: new Array(),
            cinemaInfo: '',
            modalIsOpen: false,
        }
        this.handleCinemaInfoInput = this.handleCinemaInfoInput.bind(this);
        this.handleSeatTypeChange = this.handleSeatTypeChange.bind(this);
        this.closeModal= this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    handleCinemaInfoInput(cinemaInfo){
        let seatsArray = new Array();
        for (var i = 0; i < cinemaInfo.rows; i++){
            seatsArray[i] = new Array();
            for (var j = 0; j < cinemaInfo.columns; j++) {
                seatsArray[i].push({
                    row: i,
                    column: j,
                    type:''
                });
            }
        }
        this.setState({
            seatsArray: seatsArray,
            cinemaInfoInputted: true,
            cinemaInfo: cinemaInfo
        })
    }

    handleSeatTypeChange(dataToChangeSeatType){
        this.setState({
            modalIsOpen: true,
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
            <SeatsSchemeForCreation seatsArray={this.state.seatsArray} callBackFromParent={this.handleSeatTypeChange}/> :
            <AddCinemaInfo callBackFromParent={this.handleCinemaInfoInput}/>;
        return(
            <div>
                <div className="add-cinema-container">
                    {content}
                </div>
                    <Modal     
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                    className="Modal"
                >
                    {/* component to switch seat type */}
                </Modal>
            </div>
        )
    }
}