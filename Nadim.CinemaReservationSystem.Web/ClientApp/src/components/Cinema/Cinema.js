import React, {Component} from 'react';
import { Button} from 'react-bootstrap';
import EditCinemaInfo from './EditCinemaInfo';
import FormCinemaInfo from './FormCinemaInfo';
import FormCinema from './FormCinema';

export default class Cinema extends Component{
    displayName = Cinema.displayName;

    constructor(props){
        super(props);
        this.state={
            show: false,
            infoMessage:'',
            chosenAction: ''
        };
        this.informWithMessage = this.informWithMessage.bind(this);
        this.createCinema = this.createCinema.bind(this);
        this.cancelCinemaCreation = this.cancelCinemaCreation.bind(this);
        this.editCinemaInfo = this.editCinemaInfo.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.handleChooseCreateCinemaAction = this.handleChooseCreateCinemaAction.bind(this);
        this.handleChooseEditCinemaAction = this.handleChooseEditCinemaAction.bind(this);
        
    }

    informWithMessage(message){
        this.setState({
            show: true,
            infoMessage: message,
        });
        const self = this;
        setTimeout(() => 
            self.setState({
                show: false,
                infoMessage:''
            }),5000);
    }

    createCinema(receivedCinemaInfo){
        fetch('api/cinemas', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify(receivedCinemaInfo)
        }).then(response => {
                if (response.ok){
                    return response.json();
                }
                if (response.status === 400){
                    return response.json().then((err) => {
                        throw new Error(`Bad request. ${err.details}`);
                    });
                }
                if (response.status === 401){
                    throw new Error('You need to authorize to do that action. ');
                }
                if (response.status === 404){
                        throw new Error('Cant find resourse. ');
                }
            }).then(parsedJson => {
                    this.informWithMessage('Cinema created.');
                })
                .catch(error => this.informWithMessage(error.message));
        this.setState({
            chosenAction: '',
        });
    }

    editCinemaInfo(receivedCinemaInfo){
        fetch(`api/cinemas/${receivedCinemaInfo.cinemaId}`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify(receivedCinemaInfo.cinemaInfoToSend)
        }).then(response => {
            if (response.ok){
                return response.json();
            }
            if (response.status === 400){
                return response.json().then((err) => {
                    throw new Error(`Bad request. ${err.details}`);
                });
            }
            if (response.status === 401){
                throw new Error('You need to authorize to do that action.');
            }
            if (response.status === 404){
                    throw new Error('Cant find resourse. ');
            }
        }).then(parsedJson => {
                this.informWithMessage('Cinema information edited.');
            })
            .catch(error => this.informWithMessage(error.message));
            this.setState({
                chosenAction: ''
            });
    }

    handleChooseCreateCinemaAction(){
        this.setState({
            chosenAction: 'createCinema'
        });
    }

    handleChooseEditCinemaAction(){
        this.setState({
            chosenAction: 'editCinema'
        });
    }

    renderContent(){
        if(this.state.chosenAction === 'createCinema'){
            return (         
                <FormCinemaInfo
                    callBackReceiveCinemaInfo={this.createCinema}
                    callBackCancelCinemaInfoInput={this.cancelCinemaCreation}
                />
            );
        }

        if(this.state.chosenAction === 'editCinema'){
            return (         
                <EditCinemaInfo
                    callBackEditCinemaInfo={this.editCinemaInfo}
                    callBackCancelCinemaInfoInput={this.cancelCinemaCreation}
                    callBackInformWithMessage={this.informWithMessage}
                />
            );
        }

        return(
            <fieldset>
                <Button
                    bsStyle="primary"
                    onClick={this.handleChooseCreateCinemaAction}
                >
                    Create cinema
                </Button>
                <Button
                    bsStyle="primary"
                    onClick={this.handleChooseEditCinemaAction}
                >
                    Edit cinema info
                </Button>
            </fieldset>
        );
    }

    cancelCinemaCreation(){
        this.setState({
            chosenAction: ''
        });
    }

    render(){
        const content = this.renderContent();
        return(
            <div className="add-cinema-container">
                <div className="font-x-large">
                    {this.state.show ? 
                        this.state.infoMessage :
                        ''
                    }
                </div>
                <div className="well">
                    {content}
                    <FormCinema
                        // cinema={
                        //     {
                        //         'info':
                        //         {
                        //             'name': 'asd',
                        //             'city': 'as',
                        //             'defaultSeatPrice': 10,
                        //             'vipSeatPrice': 20
                        //         }
                        //     }
                        // }
                    />
                </div>
            </div>
        );
    }
}
