import React, {Component} from 'react';
import { ButtonToolbar, DropdownButton, MenuItem, Button} from 'react-bootstrap';
import EditCinemaInfo from './EditCinemaInfo';
import FormCinemaInfo from './FormCinemaInfo';

export default class Cinema extends Component{
    displayName = Cinema.displayName;

    constructor(props){
        super(props);
        this.state={
            show: false,
            infoMessage:''
        }
        this.InformWithMessage = this.InformWithMessage.bind(this);
        this.CreateCinema = this.CreateCinema.bind(this);
        this.CancelCinemaCreation = this.CancelCinemaCreation.bind(this);
        this.EditCinemaInfo = this.EditCinemaInfo.bind(this);
    }

    InformWithMessage(message){
        this.setState({
            show: true,
            infoMessage: message,
        });
        let self = this;
        setTimeout(() => 
            self.setState({
                show: false,
                infoMessage:''
            }),5000);
    }

    CreateCinema(receivedCinemaInfo){

        fetch('api/Cinema/AddCinema', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.props.token,
            },
            body: JSON.stringify({
                ...receivedCinemaInfo
            })
        }).then(response => response.json())
            .then(parsedJson => {
                if (parsedJson.resultOk){
                    this.InformWithMessage('Cinema created.');
                }
                else {
                    this.InformWithMessage(parsedJson.details);
                }
            })
    }

    EditCinemaInfo(receivedCinemaInfo){
        console.log(receivedCinemaInfo);
        fetch('api/Cinema/AddCinema', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.props.token,
            },
            body: JSON.stringify({
                ...receivedCinemaInfo
            })
        }).then(response => response.json())
            .then(parsedJson => {
                if (parsedJson.resultOk){
                    this.InformWithMessage('Cinema information edited.');
                }
                else {
                    this.InformWithMessage(parsedJson.details);
                }
            })
    }

    CancelCinemaCreation(){
        //TODO hide cinema creation form
    }

    render(){
        return(
            <div>
                <h2>
                    {this.state.show ? 
                        this.state.infoMessage :
                        ''
                    }
                </h2>
                <FormCinemaInfo
                    callBackReceiveCinemaInfo={this.CreateCinema}
                    callBackCancelCinemaInfoInput={this.CancelCinemaCreation}
                />
                {/* <EditCinemaInfo
                    callBackEditCinemaInfo={this.EditCinemaInfo}
                /> */}
            </div>
        )
    }
}
