import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import FormCinemaRoomInfo from './FormCinemaRoomInfo';

export default class CreateCinemaRoomSeats extends Component{
    displayName = CreateCinemaRoomSeats.displayName;
    constructor(props){
        super(props);
        this.state={
            cinemaRoomInfo: this.props.cinemaRoomInfo,
            allowSubmit: true
        }
    }

    handleCreateClick = () =>{
        if (this.state.allowSubmit){
            this.props.callBackReceiveCinemaRoomInfo(this.state.cinemaRoomInfo);
        }
    }

    handleInfoChange = (cinemaRoomInfo) =>{
        this.setState({
            cinemaRoomInfo: cinemaRoomInfo.info,
            allowSubmit: cinemaRoomInfo.allowSubmit
        });
    }

    render(){
        return(
            <React.Fragment>
                <FormCinemaRoomInfo
                    callBackHandleChangeCinemaRoomInfo={this.handleInfoChange}
                    displayedComponents={{
                        rows: true, 
                        columns: true
                    }}
                    cinemaRoomInfo={this.state.cinemaRoomInfo}
                    needToShowHint={true}
                />
                <Button
                    onClick={this.handleCreateClick}
                >
                    Create
                </Button>
            </React.Fragment>
        );
    };
}