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
            showHint: false,
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
        this.allowSubmitClick()
        ?this.props.callBackFromParent({
            city: this.state.city,
            name: this.state.name,
            defaultSeatPrice: this.state.defaultPrice,
            vipSeatPrice: this.state.vipPrice
        })
        : this.setState({
            showHint: true
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
        console.log(this.validateDoubleNumber(this.state.vipPrice));
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
                        className="form-control form-control-sm"
                        id="nameInput"
                        value={this.state.name} 
                        onChange={this.handleNameChange}
                        placeholder="Name"
                    />
                    <p className="font-italic error-text">
                    {
                        !this.state.showHint || this.state.name 
                        ?''
                        :'Data not entered'
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
                        !this.state.showHint || this.state.city 
                        ?''
                        :'Data not entered'
                    }
                    </p>
                </fieldset>
                <fieldset
                    className={this.state.displayedComponents.defaultSeatPrice ? '' : 'hidden'}
                >
                    <label htmlFor="defaultSeatPriceInput" className="font-bold-large">
                        Price for default seat USD : 
                    </label> 
                    <input
                        type="text" 
                        className="form-control form-control-sm"
                        id="defaultSeatPriceInput"
                        value={this.state.defaultPrice} 
                        onChange={this.handleDefaultPriceChange}
                        placeholder="Price"
                    />
                    <p className="font-italic error-text">
                    {
                        this.state.showHint
                        ?(this.state.defaultPrice
                            ?(this.validateDoubleNumber(this.state.defaultPrice)
                                ?''
                                :'Data not valid'
                            )
                            :'Data not entered'
                        )
                        :''
                    }
                    </p>
                </fieldset>
                <fieldset
                    className={this.state.displayedComponents.vipSeatPrice ? '' : 'hidden'}
                >
                    <label htmlFor="vipSeatPriceInput" className="font-bold-large">
                        Price for VIP seat USD : 
                    </label> 
                    <input
                        type="text" 
                        className="form-control form-control-sm"
                        id="vipSeatPriceInput"
                        value={this.state.vipPrice} 
                        onChange={this.handleVipPriceChange}
                        placeholder="Price"
                    />
                    <p className="font-italic error-text">
                    {
                        this.state.showHint
                        ?(this.state.vipPrice
                            ?(this.validateDoubleNumber(this.state.vipPrice)
                                ?''
                                :'Data not valid'
                            )
                            :'Data not entered'
                        )
                        :''
                    }
                    </p>
                </fieldset>
                <Button 
                    bsStyle="primary"
                    onClick={this.handleSubmitCinemaInfoClick} 
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