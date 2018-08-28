import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import FormCinema from './FormCinema';
import CinemaService from '../../Services/CinemaService';
import ApplicationService from '../../Services/ApplicationService';
import ListItem from '../ListItem';
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
            chosenCinemaInfo: undefined
        };

        this.getCinemaList();
    }

    cancelCurrentAction = () =>{
        this.setState({
            chosenOperation:''
        });
    }

    receiveFormCinemaInfo = (receivedCinemaInfo) =>{
        const tempCinemaList = this.state.cinemaList;
        const tempChosenCinema = tempCinemaList.find((el) => el.cinemaId === this.state.chosenCinemaInfo.info.cinemaId);
        tempChosenCinema.name = receivedCinemaInfo.name;
        tempChosenCinema.city = receivedCinemaInfo.city;
        this.setState({
            cinemaList: tempCinemaList,
            chosenOperation: ''
        });
    }

    getCinemaList = () =>{
        CinemaService.getCinemaList()
        .then(requestedData => {
            this.setState({
                cinemaList: requestedData,
            });
        })
        .catch(error => 
            ApplicationService.informWithErrorMessage(error)
        );
    }

    getCinema = (id) =>{
        CinemaService.getCinema(id)
        .then(cinemaInfo => {
            this.setState({
                chosenCinemaInfo: cinemaInfo,
                chosenOperation: 'editCinema'
            })
        })
        .catch(error => {
            console.log(error);
            this.setState({
                chosenOperation:''
            });
            ApplicationService.informWithErrorMessage(error);
        });
    }

    createCinema = (cinemaInfoForCreation) =>{
        this.setState({
            chosenOperation: 'editCinemaLoading'
        });
        CinemaService.createCinema(cinemaInfoForCreation)
        .then(cinemaInfo => {
            this.setState({
                cinemaList: this.state.cinemaList.concat({
                    name: cinemaInfo.info.name , 
                    city: cinemaInfo.info.city, 
                    cinemaId: cinemaInfo.info.cinemaId
                }),
                chosenCinemaInfo: cinemaInfo,
                chosenOperation: 'editCinema'
            })
        })
        .catch(error => {
            this.setState({
                chosenOperation: ''
            });
            ApplicationService.informWithErrorMessage(error);
        });
    }

    handleChooseCreateCinemaAction = () =>{
        this.setState({
            chosenOperation: 'createCinema',
        });
    }

    handleChooseEditCinemaAction = (cinemaId) =>{
        this.setState({
            chosenOperation: 'editCinemaLoading'
        });
        this.getCinema(cinemaId);
    }

    renderActionsContent = () =>{
        return(
            <fieldset>
                <h1>Cinema list</h1>
                <fieldset className="list-container">
                    {
                        this.state.cinemaList.map((el)=>
                            <ListItem
                                params={[
                                    {label: "Name", value: el.name},
                                    {label: "City", value: el.city}
                                ]}
                                callBackFromParent={this.handleChooseEditCinemaAction}
                                id={el.cinemaId}
                                key={el.cinemaId}
                                mode="edit"
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

    renderContent = () =>{
        switch(this.state.chosenOperation){
            case 'createCinema':
                return (         
                    <FormCinema
                        token={this.props.token}
                        callBackReceiveCinemaInfo={this.createCinema}
                        callBackCancelCreateCinema={this.cancelCurrentAction}
                        callBackInformWithMessage={this.props.callBackInformWithMessage}
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
                            callBackInformWithMessage={this.props.callBackInformWithMessage}
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
