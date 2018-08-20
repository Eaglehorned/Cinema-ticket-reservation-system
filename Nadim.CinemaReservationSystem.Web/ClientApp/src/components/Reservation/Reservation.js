import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SessionDisplayInfoBox from '../Session/SessionDisplayInfoBox';
import '../../styles/Reservation.css';

export default class Reservation extends Component{
    displayName = Reservation.displayName;

    constructor(props){
        super(props);
        this.state={
            sessionList: []
        }
    }

    handleReceiveSessionList = (receivedSessionList) =>{
        this.setState({
            sessionList: receivedSessionList
        })
    }

    render(){
        return(
            <div className="content-container">
                <div className="well">
                    <div>
                        <SearchBar
                            callBackInformWithMessage={this.props.callBackInformWithMessage}
                            token={this.props.token}
                            callBackReceiveSessionList={this.handleReceiveSessionList}
                        />
                        <div className="list-container">
                            {
                                this.state.sessionList.map((el)=>
                                    <SessionDisplayInfoBox
                                        key={el.sessionId}
                                        sessionInfo={el}
                                        callBackEditSession={this.getSession}
                                        mode={'reserve'}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}