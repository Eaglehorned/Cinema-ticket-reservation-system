import React, {Component} from 'react';
import InputStringFormGroup from '../General/InputStringFormGroup';
import SubmitCancelButtons from '../General/SubmitCancelButtons';
import cinemaService from '../../Services/CinemaService';

export default class FormGeneralCinemaInfo extends Component{
    displayName = FormGeneralCinemaInfo.name;

    constructor(props){
        super(props);
        this.state = {
            city: this.props.cinemaInfo ? this.props.cinemaInfo.city : '',
            name: this.props.cinemaInfo ? this.props.cinemaInfo.name : '',
            showHint: this.props.needToShowHint ? this.props.needToShowHint : false,
            displayedComponents: this.props.displayedComponents 
            ? this.props.displayedComponents 
            : {
                city: true,
                name: true,
                buttons: true
            }
        }
    }

    informParentAboutInfoChange = (city, name) =>{
        this.props.callBackHandleInfoChange({
            info:
            {
                city: city,
                name: name
            },
            allowSubmit: cinemaService.validateCinemaInfo(
                this.state.displayedComponents,
                city,
                name
            )
        });
    }

    handleCityChange = (event) =>{
        this.setState({
            city: event.target.value
        });
        if (this.props.callBackHandleInfoChange){
            this.informParentAboutInfoChange(
                event.target.value,
                this.state.name       
            );
        }
    }

    handleNameChange = (event) =>{
        this.setState({
            name: event.target.value
        });
        if (this.props.callBackHandleInfoChange){
            this.informParentAboutInfoChange(
                this.state.city,
                event.target.value
            );
        }
    }

    handleSubmitCinemaInfoClick = () =>{
        this.setState({
            showHint: true
        });
        if(cinemaService.validateCinemaInfo(
            this.state.displayedComponents,
            this.state.name,
            this.state.city
        )){
            this.props.callBackFromParent({
                city: this.state.city,
                name: this.state.name
            });
        }
    }

    handleCancelClick = () =>{
        this.props.callBackCancel();
    }

    render(){
        return(
            <React.Fragment>
                <InputStringFormGroup
                    isShown={this.state.displayedComponents.name}
                    label="Name"
                    value={this.state.name}
                    handleValueChange={this.handleNameChange}
                    showHint={this.state.showHint}
                />
                <InputStringFormGroup
                    isShown={this.state.displayedComponents.city}
                    label="City"
                    value={this.state.city}
                    handleValueChange={this.handleCityChange}
                    showHint={this.state.showHint}
                />
                <SubmitCancelButtons
                    isShown={this.state.displayedComponents.buttons}
                    handleSubmitClick={this.handleSubmitCinemaInfoClick}
                    handleCancelClick={this.handleCancelClick}
                />
            </React.Fragment>
        );
    }
}