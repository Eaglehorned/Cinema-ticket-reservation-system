import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import FormCinema from './FormCinema';
import CinemaDisplayInfoBox from './CinemaDisplayInfoBox';
import '../../styles/FontStyles.css';
import '../../styles/Cinema.css';
import '../../styles/ListStyles.css';

export default class Cinema extends Component{
    displayName = Cinema.displayName;

    constructor(props){
        super(props);
        this.state={
            chosenOperation: '',
            cinemaList: [],
            chosenCinemaInfo: undefined,
        };
        this.informWithMessage = this.informWithMessage.bind(this);
        this.createCinema = this.createCinema.bind(this);
        this.cancelCurrentAction = this.cancelCurrentAction.bind(this);
        this.receiveFormCinemaInfo = this.receiveFormCinemaInfo.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.handleChooseCreateCinemaAction = this.handleChooseCreateCinemaAction.bind(this);
        this.handleChooseEditCinemaAction = this.handleChooseEditCinemaAction.bind(this);
        this.renderActionsContent = this.renderActionsContent.bind(this);

        this.getCinemaList();
    }

    cancelCurrentAction(){
        this.setState({
            chosenOperation:''
        });
    }

    receiveFormCinemaInfo(receivedCinemaInfo){
        let tempCinemaList = this.state.cinemaList;
        tempCinemaList.find((el) => el.cinemaId === this.state.chosenCinemaInfo.info.cinemaId).name = receivedCinemaInfo.name;
        tempCinemaList.find((el) => el.cinemaId === this.state.chosenCinemaInfo.info.cinemaId).city = receivedCinemaInfo.city;
        this.setState({
            cinemaList: tempCinemaList,
            chosenOperation: ''
        });
    }
    
    informWithMessage(message){
        this.props.callBackInformWithMessage(message);
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
                    cinemaList: parsedJson.cinemaList,
                });
            })
            .catch(error => this.informWithMessage(
                { 
                    text: error.message,
                    isError: true
                })
            );
    }

    getCinema(id){
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
                let tempParsedJson = parsedJson.info;
                tempParsedJson.info.cinemaId = id;
                this.setState({
                    chosenCinemaInfo: tempParsedJson,
                    chosenOperation: 'editCinema'
                })
            })
            .catch(error => {
                this.setState({
                    chosenOperation:''
                });
                this.informWithMessage(
                    { 
                        text: error.message,
                        isError: true
                    });
            });
    }

    createCinema(receivedCinemaInfo){
        this.setState({
            chosenOperation: 'editCinemaLoading'
        });
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
                    return response;
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
            }).then(response => {
                    let tempCinemaInfo = {};
                    tempCinemaInfo.info = receivedCinemaInfo;
                    tempCinemaInfo.info.cinemaId = response.headers.get('location').substring(response.headers.get('location').lastIndexOf('/') + 1, response.headers.get('location').length);
                    tempCinemaInfo.cinemaRooms = [];

                    this.setState({
                        cinemaList: this.state.cinemaList.concat({
                            name: tempCinemaInfo.info.name , 
                            city: tempCinemaInfo.info.city, 
                            cinemaId: tempCinemaInfo.info.cinemaId
                        }),
                        chosenCinemaInfo: tempCinemaInfo,
                        chosenOperation: 'editCinema'
                    })
                }).catch(error => {
                    this.setState({
                        chosenOperation: ''
                    });
                    this.informWithMessage(
                    { 
                        text: error.message,
                        isError: true
                    });
                });
    }

    handleChooseCreateCinemaAction(){
        this.setState({
            chosenOperation: 'createCinema',
        });
    }

    handleChooseEditCinemaAction(cinemaId){
        this.setState({
            chosenOperation: 'editCinemaLoading'
        });
        this.getCinema(cinemaId);
    }

    renderActionsContent(){
        return(
            <fieldset>
                <h1>Cinema list</h1>
                <fieldset className="list-container">
                    {
                        this.state.cinemaList.map((el)=>
                            <CinemaDisplayInfoBox
                                key={el.cinemaId}
                                cinemaInfo={el}
                                callBackEditCinema={this.handleChooseEditCinemaAction}
                            />
                        )
                    }
                    <div className="buttons-for-list"> 
                        <Button
                            bsStyle="primary"
                            onClick={this.handleChooseCreateCinemaAction}
                        >
                            Create cinema
                        </Button>
                    </div>
                </fieldset>
            </fieldset>
        );
    }

    renderContent(){
        switch(this.state.chosenOperation){
            case 'createCinema':
                return (         
                    <FormCinema
                        token={this.props.token}
                        callBackReceiveCinemaInfo={this.createCinema}
                        callBackCancelCreateCinema={this.cancelCurrentAction}
                        callBackInformWithMessage={this.informWithMessage}
                    />
                );
            case 'editCinemaLoading':
                return (
                    <div className="font-x-large font-italic">
                        Loading...
                    </div>
                );
            case 'editCinema':
                if (this.state.chosenCinemaInfo){
                    return(         
                        <FormCinema
                            token={this.props.token}
                            cinema={this.state.chosenCinemaInfo}
                            callBackFormCinemaInfo={this.receiveFormCinemaInfo}
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
            <div className="content-container">
                <div className="well">
                    {content}
                </div>
            </div>
        );
    }
}
