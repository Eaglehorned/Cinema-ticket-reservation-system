import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

export default class FormGeneralCinemaInfo extends Component{
    displayName = FormGeneralCinemaInfo.name;

    constructor(props){
        super(props);
        this.state = {
            city: this.props.cinemaInfo ? this.props.cinemaInfo.city : '',
            name: this.props.cinemaInfo ? this.props.cinemaInfo.name : '',
            defaultPrice: this.props.cinemaInfo ? this.props.cinemaInfo.defaultSeatPrice : '',
            vipPrice: this.props.cinemaInfo ? this.props.cinemaInfo.vipSeatPrice : '',
            displayedComponents: this.props.displayedComponents ? 
                                    this.props.displayedComponents : 
                                    {
                                        city: true,
                                        name: true,
                                        defaultSeatPrice: true,
                                        vipSeatPrice: true,
                                    }
        }
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmitCinemaInfoClick = this.handleSubmitCinemaInfoClick.bind(this);
        this.handleDefaultPriceChange = this.handleDefaultPriceChange.bind(this);
        this.handleVipPriceChange = this.handleVipPriceChange.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.allowSubmitClick = this.allowSubmitClick.bind(this);
    }

    validateIntNumber(number){
        const result = /^\d+$/;
        return result.test(String(number));
    }

    validateDoubleNumber(number){
        const result = /^\d+([.,]\d+)?$/;
        return result.test(String(number));
    }

    handleCityChange(event){
        this.setState({
            city: event.target.value
        });
    }

    handleNameChange(event){
        this.setState({
            name: event.target.value
        });
    }

    handleDefaultPriceChange(event){
        this.setState({
            defaultPrice: event.target.value
        });
    }

    handleVipPriceChange(event){
        this.setState({
            vipPrice: event.target.value
        });
    }

    handleSubmitCinemaInfoClick(){
        this.props.callBackFromParent({
            city: this.state.city,
            name: this.state.name,
            defaultSeatPrice: this.state.defaultPrice,
            vipSeatPrice: this.state.vipPrice
        });
    }

    handleCancelClick(){
        this.props.callBackCancel();
    }

    allowSubmitClick(){
        if (this.state.displayedComponents.defaultSeatPrice && !this.validateDoubleNumber(this.state.defaultPrice)){
            return false;
        }
        if (this.state.displayedComponents.vipSeatPrice && !this.validateDoubleNumber(this.state.vipPrice)){
            return false;
        }
        if (this.state.displayedComponents.city && !this.state.city){
            return false;
        }
        if (this.state.displayedComponents.name && !this.state.name){
            return false;
        }
        return true;
    }

    render(){
        return(
            <fieldset>
                <h2>
                    Input general cinema information
                </h2>
                <fieldset
                    className={this.state.displayedComponents.name ? '' : 'hidden'}
                >
                    <label htmlFor="nameInput" className="font-bold-large">
                        Name : 
                    </label> 
                    <input 
                        type="text" 
                        className=
                        {
                            `form-control form-control-sm
                            ${
                                this.state.name
                                ? ''
                                :' error'
                            }`
                        }
                        id="nameInput"
                        value={this.state.name} 
                        onChange={this.handleNameChange}
                        placeholder="Name"
                    />
                </fieldset>
                <fieldset
                    className={this.state.displayedComponents.city ? '' : 'hidden'}
                >
                    <label htmlFor="cityInput" className="font-bold-large">
                        City : 
                    </label> 
                    <input 
                        type="text" 
                        className=
                        {
                            `form-control form-control-sm
                            ${
                                this.state.city
                                ? ''
                                :' error'
                            }`
                        }
                        id="cityInput"
                        value={this.state.city} 
                        onChange={this.handleCityChange}
                        placeholder="City"
                    />
                </fieldset>
                <fieldset
                    className={this.state.displayedComponents.defaultSeatPrice ? '' : 'hidden'}
                >
                    <label htmlFor="defaultSeatPriceInput" className="font-bold-large">
                        Price for default seat USD : 
                    </label> 
                    <input
                        type="text" 
                        className=
                        {
                            `form-control form-control-sm
                            ${
                                this.validateDoubleNumber(this.state.defaultPrice)
                                ? ''
                                :' error'
                            }`
                        }
                        id="defaultSeatPriceInput"
                        value={this.state.defaultPrice} 
                        onChange={this.handleDefaultPriceChange}
                        placeholder="Price"
                    />
                </fieldset>
                <fieldset
                    className={this.state.displayedComponents.vipSeatPrice ? '' : 'hidden'}
                >
                    <label htmlFor="vipSeatPriceInput" className="font-bold-large">
                        Price for VIP seat USD : 
                    </label> 
                    <input
                        type="text" 
                        className=
                        {
                            `form-control form-control-sm
                            ${
                                this.validateDoubleNumber(this.state.vipPrice)
                                ? ''
                                :' error'
                            }`
                        }
                        id="vipSeatPriceInput"
                        value={this.state.vipPrice} 
                        onChange={this.handleVipPriceChange}
                        placeholder="Price"
                    />
                </fieldset>
                {this.allowSubmitClick() ? 
                    '' : 
                    <h4 className="font-italic">
                        Data invalid or not entered
                    </h4>
                }
                <Button 
                    bsStyle="primary"
                    onClick={this.handleSubmitCinemaInfoClick} 
                    disabled={
                        !(
                            this.allowSubmitClick()
                        )
                    }
                >
                    Submit
                </Button>
                <Button 
                    onClick={this.handleCancelClick} 
                >
                    Cancel
                </Button>
            </fieldset>
        );
    }
}