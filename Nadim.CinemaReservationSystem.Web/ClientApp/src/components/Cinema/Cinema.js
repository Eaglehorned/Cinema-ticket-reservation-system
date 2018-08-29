import React, {Component} from 'react';
import FormCinema from './FormCinema';
import CinemaService from '../../Services/CinemaService';
import ApplicationService from '../../Services/ApplicationService';
import '../../styles/FontStyles.css';
import '../../styles/Cinema.css';
import '../../styles/ListStyles.css';
import DisplayCinemaList from './DisplayCinemaList';

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

    editCinema = (cinemaInfo) =>{
        this.setState({
            chosenOperation: ''
        });
        CinemaService.editCinema(cinemaInfo)
        .then(() => {
            const tempCinemaList = this.state.cinemaList;
            const tempChosenCinema = tempCinemaList.find((el) => el.cinemaId === cinemaInfo.cinemaId);
            tempChosenCinema.name = cinemaInfo.name;
            tempChosenCinema.city = cinemaInfo.city;
            this.setState({
                cinemaList: tempCinemaList,
                chosenOperation: ''
            });
            ApplicationService.informWithMessage('Cinema information edited.');
        })
        .catch(error => ApplicationService.informWithErrorMessage(error));
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
                <DisplayCinemaList
                    list={this.state.cinemaList}
                    handleElementClick={this.handleChooseEditCinemaAction}
                    handleListButtonClick={this.handleChooseCreateCinemaAction}
                />
            </fieldset>
        );
    }

    renderContent = () =>{
        switch(this.state.chosenOperation){
            case 'createCinema':
                return (         
                    <FormCinema
                        callBackCancelParentOperation={this.cancelCurrentAction}
                        callBackFromParent={this.createCinema}
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
                            cinema={this.state.chosenCinemaInfo}
                            callBackCancelParentOperation={this.cancelCurrentAction}
                            callBackFromParent={this.editCinema}
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
