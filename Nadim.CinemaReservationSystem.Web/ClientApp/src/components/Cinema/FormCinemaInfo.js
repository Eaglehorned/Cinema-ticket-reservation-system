import React, { Component } from 'react';
import FormGeneralCinemaInfo from './FormGeneralCinemaInfo';
import FormCinemaRooms from './FormCinemaRooms';
import '../../styles/Cinema.css';

export default class FormCinemaInfo extends Component {
    displayName = FormCinemaInfo.name;

    constructor(props) {
        super(props);
        this.state={
            cinemaInfoInputted: false,
            cinemaGeneralInfo: {},
            modalIsOpen: false,
            seatInfoToTypeChange: {},
            error: '',
        }
        this.handleCinemaInfoInput = this.handleCinemaInfoInput.bind(this);
        this.handleCancelCinemaDataInput = this.handleCancelCinemaDataInput.bind(this);
        this.handleReceiveCinemaRoomsInfo = this.handleReceiveCinemaRoomsInfo.bind(this);
        this.handleCancelCinemaRoomsInfoInput = this.handleCancelCinemaRoomsInfoInput.bind(this);
        this.handleCancelGeneralCinemaInfoInput = this.handleCancelGeneralCinemaInfoInput.bind(this);
    }

    handleCinemaInfoInput(cinemaData){
        this.setState({
            cinemaInfoInputted: true,
            cinemaGeneralInfo: cinemaData
        })
    }

    handleCancelCinemaDataInput(){
        this.setState({
            cinemaInfoInputted: false,
        })
    }

    handleReceiveCinemaRoomsInfo(cinemaRooms){
        let cinemaInfoToSend = this.state.cinemaGeneralInfo;
        cinemaInfoToSend["cinemaRooms"] = cinemaRooms;
        delete cinemaInfoToSend["cinemaRoomsCount"];
        this.props.callBackReceiveCinemaInfo({
            ...cinemaInfoToSend,
        });
    }

    handleCancelCinemaRoomsInfoInput(){
        this.setState({
            cinemaInfoInputted: false,
        })
    }

    handleCancelGeneralCinemaInfoInput(){
        this.props.callBackCancelCinemaCreation();
    }

    render(){
        let content = this.state.cinemaInfoInputted ? 
            <FormCinemaRooms
                cinemaRoomsCount={this.state.cinemaGeneralInfo.cinemaRoomsCount}
                callBackReceiveCinemaRoomsInfo={this.handleReceiveCinemaRoomsInfo}
                callBackCancelCinemaRoomsInfoInput={this.handleCancelCinemaRoomsInfoInput}
            />
            :
            <FormGeneralCinemaInfo 
                callBackFromParent={this.handleCinemaInfoInput}
                callBackCancelGeneralCinemaInfoInput={this.handleCancelGeneralCinemaInfoInput}
            /> ;
        return(
            <div>
                <div className="well">
                <h1>Create cinema</h1>
                    {content}
                </div>
            </div>
        )
    }
}