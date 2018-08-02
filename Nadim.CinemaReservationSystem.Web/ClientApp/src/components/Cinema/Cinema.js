import React, {Component} from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
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
            chosenOperation: '',
            cinemaList: [],
            chosenCinema: undefined,
        };
        this.informWithMessage = this.informWithMessage.bind(this);
        this.createCinema = this.createCinema.bind(this);
        this.cancelFormCinema = this.cancelFormCinema.bind(this);
        this.editCinemaInfo = this.editCinemaInfo.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.handleChooseCreateCinemaAction = this.handleChooseCreateCinemaAction.bind(this);
        this.handleChooseEditCinemaAction = this.handleChooseEditCinemaAction.bind(this);
        this.renderActionsContent = this.renderActionsContent.bind(this);
        this.renderChooseCinemaContent = this.renderChooseCinemaContent.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.getCinemaList();
    }

    cancelFormCinema(){
        this.setState({
            chosenOperation: ''
        });
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

    getCinemaList(){
        fetch('api/cinemas', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
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
                    throw new Error('Cant find resourse.');
            }
        }).then(parsedJson => {
                this.setState({
                    cinemaList: parsedJson.cinemaList
                });
            })
            .catch(error => this.informWithMessage(error.message));
    }

    getCinema(id){
        console.log(this.state.chosenCinema);
        fetch(`api/cinemas/${id}`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
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
                    throw new Error('Cant find resourse.');
            }
        }).then(parsedJson => {
                return parsedJson;
            })
            .catch(error => {
                this.informWithMessage(error.message);
                return undefined;
            });
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
                chosenOperation: ''
            });
    }

    handleChooseCreateCinemaAction(){
        this.setState({
            chosenOperation: 'createCinema'
        });
    }

    handleChooseEditCinemaAction(){
        this.setState({
            chosenOperation: 'editCinema'
        });
    }

    handleSelect(eventKey){
        this.setState({
            chosenCinema: this.state.cinemaList[eventKey]
        });
    }
    
    renderChooseCinemaContent(){
        return(
            <fieldset>
                <legend>
                    Choose cinema
                </legend>
                <div className="font-large">
                {
                    this.state.chosenCinema ? 
                        `Chosen cinema : ${this.state.chosenCinema.name}, ${this.state.chosenCinema.city}` :
                        ''
                }
                </div>
                <DropdownButton
                    bsStyle="default"
                    title="Choose cinema"
                    id="choose-cinema-to-edit"
                >
                {
                    
                    this.state.cinemaList.map((el, i)=>
                        <MenuItem 
                            eventKey={i}
                            onSelect={this.handleSelect}
                            key={i}
                        >
                            {el.name}, {el.city}
                        </MenuItem>
                    )
                }
                </DropdownButton>
            </fieldset>
        );
    }

    renderActionsContent(){
        return(
            <fieldset>
                <fieldset>
                    <Button
                        bsStyle="primary"
                        onClick={this.handleChooseCreateCinemaAction}
                    >
                        Create cinema
                    </Button>
                </fieldset>
                {this.renderChooseCinemaContent()}
                <Button
                    bsStyle="primary"
                    onClick={this.handleChooseEditCinemaAction}
                >
                    Edit cinema info
                </Button>
            </fieldset>
        );
    }

    renderContent(){
        switch(this.state.chosenOperation){
            case 'createCinema':
                return (         
                    <FormCinema
                        callBackReceiveCinemaInfo={this.createCinema}
                        callBackCancel={this.cancelFormCinema}
                        callBackInformWithMessage={this.informWithMessage}
                    />
                );
            case 'editCinema':
                let cinema = this.getCinema(this.state.chosenCinema.cinemaId);
                if (cinema){
                    return(         
                        <FormCinema
                            callBackEditCinemaInfo={this.editCinemaInfo}
                            callBackCancel={this.cancelFormCinema}
                            callBackInformWithMessage={this.informWithMessage}
                        />
                    )
                }
                this.setState({chosenOperation: ''});
                break;
            default: 
                return this.renderActionsContent();
        }
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
                    {/* //<FormCinema
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
                    /> */}
                </div>
            </div>
        );
    }
}
