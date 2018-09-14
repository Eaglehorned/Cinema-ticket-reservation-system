import React, {Component} from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import FormCinema from './FormCinema';
import cinemaService from '../../Services/CinemaService';
import applicationService from '../../Services/ApplicationService';
import '../../styles/FontStyles.css';
import '../../styles/Cinema.css';
import '../../styles/ListStyles.css';
import DisplayCinemaList from './DisplayCinemaList';

class Cinema extends Component{
    displayName = Cinema.displayName;

    constructor(props){
        super(props);
        this.state={
            chosenOperation: '',
            cinemaList: [],
            chosenCinemaInfo: undefined
        };
    }

    componentWillMount(){
        this.getCinemaList();
    }   

    cancelCurrentAction = () =>{
        this.setState({
            chosenOperation:''
        });
        this.props.history.push(`${this.props.match.url}`)
    }

    editCinema = (cinemaInfo) =>{
        this.setState({
            chosenOperation: ''
        });

        this.props.history.push(`${this.props.match.url}`)

        cinemaService.editCinema(cinemaInfo)
        .then(() => {
            this.setState({
                cinemaList: cinemaService.updateCinemaList(
                    this.state.cinemaList,
                    cinemaInfo
                ),
                chosenOperation: ''
            });
            applicationService.informWithMessage('Cinema information edited.');
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    getCinemaList = () =>{
        cinemaService.getCinemaList()
        .then(requestedData => {
            this.setState({
                cinemaList: requestedData,
            });
        })
        .catch(error => 
            applicationService.informWithErrorMessage(error)
        );
    }

    getCinema = (id) =>{
        cinemaService.getCinema(id)
        .then(cinemaInfo => {
            this.setState({
                chosenCinemaInfo: cinemaInfo,
                chosenOperation: 'editCinema'
            })
        })
        .then(() => this.props.history.push(`${this.props.match.url}/${id}`))
        .catch(error => {
            this.setState({
                chosenOperation:''
            });
            applicationService.informWithErrorMessage(error);
        });
    }

    createCinema = (cinemaInfoForCreation) =>{
        this.setState({
            chosenOperation: 'editCinemaLoading'
        });
        cinemaService.createCinema(cinemaInfoForCreation)
        .then(cinemaId => {
            this.setState({
                cinemaList: this.state.cinemaList.concat({
                    name: cinemaInfoForCreation.name , 
                    city: cinemaInfoForCreation.city, 
                    cinemaId: cinemaId
                }),
                chosenCinemaInfo: {
                    info: {...cinemaInfoForCreation, cinemaId},
                    cinemaRooms: []
                },
                chosenOperation: 'editCinema'
            });
            applicationService.informWithMessage('Cinema created.');
        })
        .catch(error => {
            this.setState({
                chosenOperation: ''
            });
            applicationService.informWithErrorMessage(error);
        });
    }

    handleChooseCreateCinemaOpeation = () =>{
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
            <React.Fragment>
                <h1>Cinema list</h1>
                <DisplayCinemaList
                    list={this.state.cinemaList}
                    handleElementClick={this.handleChooseEditCinemaAction}
                    handleListButtonClick={this.handleChooseCreateCinemaOpeation}
                />
            </React.Fragment>
        );
    }

    renderContent = () =>{
        // switch(this.state.chosenOperation){
        //     case 'createCinema':
        //         return (         
        //             <FormCinema
        //                 callBackCancelParentOperation={this.cancelCurrentAction}
        //                 callBackFromParent={this.createCinema}
        //             />
        //         );
        //     case 'editCinemaLoading':
        //         return (
        //             <div className="font-x-large font-italic">
        //                 Loading...
        //             </div>
        //         );
        //     case 'editCinema':
        //         if (this.state.chosenCinemaInfo){
        //             return(         
        //                 <FormCinema
        //                     cinema={this.state.chosenCinemaInfo}
        //                     callBackCancelParentOperation={this.cancelCurrentAction}
        //                     callBackFromParent={this.editCinema}
        //                 />
        //             )
        //         }
        //         this.setState({chosenOperation: ''});
        //         break;
        //     default: 
        //         return this.renderActionsContent();
        // }
        const test = "test";
        return(
            <Switch>
                <Route path={`${this.props.match.url}/:number`} component={() => (
                    <FormCinema
                        cinema={this.state.chosenCinemaInfo}
                        callBackCancelParentOperation={this.cancelCurrentAction}
                        callBackFromParent={this.editCinema}
                    />
                )}/>
                <Route exact path={this.props.match.url}
                    render={() => this.renderActionsContent()}
                />
            </Switch>
        );
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

export default withRouter(Cinema);
