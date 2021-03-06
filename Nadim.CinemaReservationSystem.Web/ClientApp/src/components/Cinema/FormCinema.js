import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import FormGeneralCinemaInfo from './FormGeneralCinemaInfo';
import FormCinemaRoom from './FormCinemaRoom';
import cinemaService from '../../Services/CinemaService';
import applicationService from '../../Services/ApplicationService';
import SubmitCancelButtons from '../General/SubmitCancelButtons';
import DisplayCinemaRoomsList from './DisplayCinemaRoomsList';
import Loading from '../General/Loading';
import '../../styles/FormCinema.css';

class FormCinema extends Component{
    displayName = FormCinema.displayName;

    constructor(props){
        super(props);
        this.state={
            cinemaInfo: undefined,
            cinemaRooms: undefined,
            chosenCinemaRoomInfo: undefined,
            allowSubmit: true,
            dataIsLoaded: false
        };
    }

    componentWillMount(){
        if(this.props.match.params.id){
            this.getCinema(this.props.match.params.id)
            .then(() => this.setState({ dataIsLoaded: true }))
            .catch(error => {
                applicationService.informWithErrorMessage(error);
                this.props.callBackReturnToUpperPage();
            });
        }
        else{
            this.setState({ dataIsLoaded: true });
        }
    }

    getCinema = (id) =>{
        return cinemaService.getCinema(id)
        .then(cinema => {
            this.setState({
                cinemaInfo: cinema.info,
                cinemaRooms: cinema.cinemaRooms
            })
        });
    }

    createCinemaRoom = (cinemaRoomInfo) =>{
        this.returnToCinemaMainPage();

        cinemaService.createCinemaRoom(this.props.match.params.id, cinemaRoomInfo)
        .then(cinemaRoom => {
            this.setState({
                cinemaRooms: this.state.cinemaRooms.concat(cinemaRoom)
            });
            applicationService.informWithMessage('Cinema room created');
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }
    
    editCinemaRoom = (cinemaRoomInfo) =>{
        this.returnToCinemaMainPage();

        cinemaService.editCinemaRoom(this.props.match.params.id, cinemaRoomInfo)
        .then(() => {
            this.setState({
                cinemaRooms: cinemaService.updateCinemaRoomList(
                    this.state.cinemaRooms,
                    cinemaRoomInfo
                )
            });
            applicationService.informWithMessage('Cinema room edited.');
        })
        .catch(error => applicationService.informWithErrorMessage(error));
    }

    submitFormCinema = () =>{
        if(this.state.allowSubmit){
            this.props.callBackFromParent(
                this.state.cinemaInfo
            );
        }
    }

    returnToCinemaMainPage = () =>{
        this.props.history.push(`${this.props.match.url}`);
    }

    handleCinemaInfoChange = (cinemaInfo) =>{
        let tempCinemaInfo = cinemaInfo.info;
        tempCinemaInfo.cinemaId = this.state.cinemaInfo.cinemaId;
        this.setState({
            cinemaInfo: tempCinemaInfo,
            allowSubmit: cinemaInfo.allowSubmit
        });
    }

    handleChooseEditCinemaRoomAction = (cinemaRoomId) =>{
        this.props.history.push(`${this.props.match.url}/cinemaRoom/${cinemaRoomId}`)
    }

    handleChooseCreateCinemaRoomAction = () =>{
        this.props.history.push(`${this.props.match.url}/cinemaRoom/new`);
    }

    renderCinemaActionButtons = () =>{
        return(
            <fieldset>
                <legend>
                    Cinema rooms
                </legend>
                <DisplayCinemaRoomsList
                    list={this.state.cinemaRooms}
                    handleElementClick={this.handleChooseEditCinemaRoomAction}
                    handleListButtonClick={this.handleChooseCreateCinemaRoomAction}
                />
                <SubmitCancelButtons
                    handleSubmitClick={this.submitFormCinema}
                    handleCancelClick={this.props.callBackReturnToUpperPage}
                />
            </fieldset>
        )
    }

    renderFormCreateCinemaContent = () =>{
        return(
            <React.Fragment>
                <h1>Cinema</h1>
                <h2>
                    Input general cinema information
                </h2>
                <FormGeneralCinemaInfo 
                    callBackFromParent={this.props.callBackFromParent}
                    callBackCancel={this.props.callBackReturnToUpperPage}
                />
            </React.Fragment>
        );
    }

    renderCinemaInfoAndActionsContent = () =>{
        return (
            <React.Fragment>
                <h1>Cinema</h1>
                <div className="form-cinema-room-container cinema-room-information-container">
                <h2>Cinema information</h2>
                    <FormGeneralCinemaInfo         
                        callBackHandleInfoChange={this.handleCinemaInfoChange}
                        cinemaInfo={this.state.cinemaInfo}
                        displayedComponents={{
                            city: true,
                            name: true,
                            buttons: false
                        }}
                        needToShowHint={true}
                    />
                </div>
                <div className="form-cinema-room-container cinema-room-buttons-container">
                    {this.renderCinemaActionButtons()}
                </div>
            </React.Fragment>
        );
    }

    renderContent = () =>{
        if (!this.state.cinemaInfo){
            return this.renderFormCreateCinemaContent();
        }
        return(
            <Switch>
                <Route exact path={`${this.props.match.url}/cinemaRoom/new`} render={() =>(
                    <FormCinemaRoom
                        callBackReceiveCinemaRoom={this.createCinemaRoom}
                        callBackReturnToUpperPage={this.returnToCinemaMainPage}
                    />
                )}/>
                <Route path={`${this.props.match.url}/cinemaRoom/:id`} render={() => (
                    <FormCinemaRoom
                        callBackReceiveCinemaRoom={this.editCinemaRoom}
                        callBackReturnToUpperPage={this.returnToCinemaMainPage}
                    />
                )}/>
                <Route exact path={this.props.match.url} render={()=>(
                    this.renderCinemaInfoAndActionsContent()
                )}/>
            </Switch>
        );
    }

    render(){
        const content = this.state.dataIsLoaded
        ? this.renderContent()
        : <Loading/>;

        return(
            <div className="form-cinema-room-container">
                {content}
            </div>
        )
    }
}

export default withRouter(FormCinema);