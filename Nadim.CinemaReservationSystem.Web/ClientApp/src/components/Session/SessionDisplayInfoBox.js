import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class SessionDisplayInfoBox extends Component{
    displayName = SessionDisplayInfoBox.displayName;

    handleActionButtonClick = () =>{
        this.props.callBackHandleSessionAction(this.props.sessionInfo.sessionId);
    }

    render(){
        return(
            <div className="list-box-container">
                <div className="font-large">
                    <div>
                        <div className="list-box-inline-item"><span className="font-bold">Cinema :</span> {this.props.sessionInfo.cinemaName}</div>
                        <div className="list-box-inline-item"><span className="font-bold">Cinema city :</span> {this.props.sessionInfo.cinemaCity}</div>
                        <div className="list-box-inline-item"><span className="font-bold">Cinema room :</span> {this.props.sessionInfo.cinemaRoomName}</div>
                    </div>
                    <div>
                        <div className="list-box-inline-item"><span className="font-bold">Film :</span> {this.props.sessionInfo.filmName}</div>
                        <div className="list-box-inline-item"><span className="font-bold">Time :</span> {new Date(this.props.sessionInfo.beginTime).toLocaleString()}</div>
                    </div>
                </div>
                <Button
                    onClick={this.handleActionButtonClick}
                >
                    {this.props.mode === 'reserve' ? 'Reserve' : 'Edit'}
                </Button>
            </div>
        );
    }
}