import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import '../../styles/Cinema.css';

export default class EditCinemaGeneralInfo extends Component {
    displayName = EditCinemaGeneralInfo.name;

    constructor(props){
        super(props);
        this.state = {
            city:'',
            name: '',
            defaultPrice: '',
            vipPrice: '',
        }
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDefaultPriceChange = this.handleDefaultPriceChange.bind(this);
        this.handleVipPriceChange = this.handleVipPriceChange.bind(this);
        this.handleChangeCinemaClick = this.handleChangeCinemaClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    validateDoubleNumber(number){
        let result = /^\d+([.,]\d+)?$/;
        return result.test(String(number));
    }

    handleDefaultPriceChange(event){
        this.setState({
            defaultPrice: event.target.value, 
        });
    }

    handleVipPriceChange(event){
        this.setState({
            vipPrice: event.target.value, 
        });
    }

    handleCityChange(event){
        this.setState({
            city: event.target.value, 
        });
    }

    handleNameChange(event){
        this.setState({
            name: event.target.value, 
        });
    }

    handleChangeCinemaClick(){
        this.props.callBackChangeInfo({
            city: this.state.city,
            newName: this.state.name,
            defaultPrice: this.state.defaultPrice,
            vipPrice: this.state.vipPrice,
        });
    }

    handleCancelClick(){
        this.props.callBackCancelCinemaInfoInput();
    }

    render(){
        return(
            <div>
            <h4>
                <strong>City : </strong>
            </h4> 
            <input 
                type="text" 
                className="form-control form-control-sm" 
                value={this.state.city} 
                onChange={this.handleCityChange}
                placeholder="City"
            />
            <h4>
                <strong>Cinema name : </strong>
            </h4> 
            <input 
                type="text" 
                className="form-control form-control-sm" 
                value={this.state.name} 
                onChange={this.handleNameChange}
                placeholder="Name"
            />
            <h4>
                <strong>Price for default seat USD : </strong>
            </h4> 
            <input
                type="text" 
                className="form-control form-control-sm" 
                value={this.state.defaultPrice} 
                onChange={this.handleDefaultPriceChange}
                placeholder="Price"
            />
            <h4>
                <strong>Price for VIP seat USD : </strong>
            </h4> 
            <input
                type="text" 
                className="form-control form-control-sm" 
                value={this.state.vipPrice} 
                onChange={this.handleVipPriceChange}
                placeholder="Price"
            />
            <Button 
                bsStyle="primary" 
                onClick={this.handleChangeCinemaClick} 
                disabled={
                    !(
                        this.validateDoubleNumber(this.state.defaultPrice) &&
                        this.validateDoubleNumber(this.state.vipPrice) &&
                        this.state.city && 
                        this.state.name
                    )
                }
            >
                Change
            </Button>
            <Button 
                bsStyle="secondary" 
                onClick={this.handleCancelClick} 
            >
                Cancel
            </Button>
        </div>
        )
    }
}
