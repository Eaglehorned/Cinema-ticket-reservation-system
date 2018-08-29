import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

export default class FormGeneralCinemaInfo extends Component{
    displayName = FormGeneralCinemaInfo.name;

    constructor(props){
        super(props);
        this.state = {
            city: this.props.cinemaInfo ? this.props.cinemaInfo.city : '',
            name: this.props.cinemaInfo ? this.props.cinemaInfo.name : '',
            showHint: this.props.needToShowHint ? this.props.needToShowHint: false,
            displayedComponents: this.props.displayedComponents 
            ? this.props.displayedComponents 
            : {
                city: true,
                name: true,
                submit: true,
                cancel: true
            }
        }
        this.validateString = this.validateString.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmitCinemaInfoClick = this.handleSubmitCinemaInfoClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.allowSubmitClick = this.allowSubmitClick.bind(this);
    }

    validateString(str){
        return !this.state.showHint || str
        ?''
        :'Data not entered';
    }

    handleCityChange(event){
        this.setState({
            city: event.target.value
        });
        if (this.props.callBackHandleInfoChange){
            this.props.callBackHandleInfoChange({
                info:
                {
                    city: event.target.value,
                    name: this.state.name
                },
                allowSubmit: this.allowSubmitClick(
                    event.target.value,
                    this.state.name       
                )
            });
        }
    }

    handleNameChange(event){
        this.setState({
            name: event.target.value
        });
        if (this.props.callBackHandleInfoChange){
            this.props.callBackHandleInfoChange({
                info:
                {
                    city: this.state.city,
                    name: event.target.value
                },
                allowSubmit: this.allowSubmitClick(
                    this.state.city,
                    event.target.value
                )
            });
        }
    }

    handleSubmitCinemaInfoClick(){
        this.allowSubmitClick(
            this.state.name,
            this.state.city
        )
        ?this.props.callBackFromParent({
            city: this.state.city,
            name: this.state.name
        })
        : this.setState({
            showHint: true
        });
    }

    handleCancelClick(){
        this.props.callBackCancel();
    }

    allowSubmitClick(city, name){
        if (this.state.displayedComponents.city && !city){
            return false;
        }
        if (this.state.displayedComponents.name && !name){
            return false;
        }
        return true;
    }

    render(){
        return(
            <fieldset>
                <fieldset
                    className={this.state.displayedComponents.name ? '' : 'hidden'}
                >
                    <label htmlFor="nameInput" className="font-bold-large">
                        Name : 
                    </label> 
                    <input 
                        type="text" 
                        className="form-control form-control-sm"
                        id="nameInput"
                        value={this.state.name} 
                        onChange={this.handleNameChange}
                        placeholder="Name"
                    />
                    <p className="font-italic error-text">
                    {
                        this.validateString(this.state.name)
                    }
                    </p>
                </fieldset>
                <fieldset
                    className={this.state.displayedComponents.city ? '' : 'hidden'}
                >
                    <label htmlFor="cityInput" className="font-bold-large">
                        City : 
                    </label> 
                    <input 
                        type="text" 
                        className="form-control form-control-sm"
                        id="cityInput"
                        value={this.state.city} 
                        onChange={this.handleCityChange}
                        placeholder="City"
                    />
                    <p className="font-italic error-text">
                    {
                        this.validateString(this.state.city)
                    }
                    </p>
                </fieldset>
                <Button 
                    className={this.state.displayedComponents.submit?'':'hidden'}
                    bsStyle="primary"
                    onClick={this.handleSubmitCinemaInfoClick} 
                >
                    Submit
                </Button>
                <Button 
                    className={this.state.displayedComponents.cancel?'':'hidden'}
                    onClick={this.handleCancelClick} 
                >
                    Cancel
                </Button>
            </fieldset>
        );
    }
}