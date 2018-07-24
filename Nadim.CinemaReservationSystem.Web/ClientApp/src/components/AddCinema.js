import React, { Component } from 'react';
import AddCinemaInfo from './AddCinemaInfo';
import SeatsScheme from './SeatsScheme';
import '../styles/AddCinema.css';

export default class AddCinema extends Component {
    displayName = AddCinema.name;

    constructor(props) {
        super(props);
        this.state={
            cinemaInfoInputted: false,
            seatsArray: new Array(),
            cinemaInfo: ''
        }
        this.handleCinemaInfoInput = this.handleCinemaInfoInput.bind(this);
        this.handleOnSeatClick = this.handleSeatTypeChange.bind(this);
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
        console.log(dataToChangeSeatType.row);
        console.log(dataToChangeSeatType.column);
    }

    render(){
        let content = this.state.cinemaInfoInputted ? 
            <SeatsScheme seatsArray={this.state.seatsArray} callBackFromParent={this.handleSeatTypeChange}/> :
            <AddCinemaInfo callBackFromParent={this.handleCinemaInfoInput}/>;
        return(
            <div className="add-cinema-container">
                {content}
            </div>
        )
    }
}