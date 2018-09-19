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
            cinemaList: [],
            chosenCinemaInfo: undefined
        };
    }

    componentWillMount(){
        this.getCinemaList();
    }   

    returnToCinemaPage = () =>{
        this.props.history.push(`${this.props.match.url}`)
    }

    editCinema = (cinemaInfo) =>{
        this.returnToCinemaPage();

        cinemaService.editCinema(cinemaInfo)
        .then(() => {
            this.setState({
                cinemaList: cinemaService.updateCinemaList(
                    this.state.cinemaList,
                    cinemaInfo.cinemaId,
                    cinemaInfo
                )
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

    createCinema = (cinemaInfoForCreation) =>{
        this.returnToCinemaPage();

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
                }
            });
            applicationService.informWithMessage('Cinema created.');
        })
        .then(() => this.props.history.push(`${this.props.match.url}/${this.state.chosenCinemaInfo.info.cinemaId}`))
        .catch(error => {
            applicationService.informWithErrorMessage(error);
        });
    }

    handleChooseCreateCinemaAction = () =>{
        this.props.history.push(`${this.props.match.url}/new`);
    }

    handleChooseEditCinemaAction = (cinemaId) =>{
        this.props.history.push(`${this.props.match.url}/${cinemaId}`);
    }

    renderActionsContent = () =>{
        return(
            <React.Fragment>
                <h1>Cinema list</h1>
                <DisplayCinemaList
                    list={this.state.cinemaList}
                    handleElementClick={this.handleChooseEditCinemaAction}
                    handleListButtonClick={this.handleChooseCreateCinemaAction}
                />
            </React.Fragment>
        );
    }

    renderContent = () =>{
        return(
            <Switch>
                <Route exact path={`${this.props.match.url}/new`} render ={() => (
                    <FormCinema
                        callBackReturnToUpperPage={this.returnToCinemaPage}
                        callBackFromParent={this.createCinema}
                    />
                )}/>
                <Route path={`${this.props.match.url}/:id`} render={() => (
                    <FormCinema
                        callBackReturnToUpperPage={this.returnToCinemaPage}
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
