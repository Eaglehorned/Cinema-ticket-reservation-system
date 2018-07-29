import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

export default class FormGeneralCinemaInfo extends Component{
    displayName = FormGeneralCinemaInfo.name;

    constructor(props){
        super(props);
        this.state = {
            city:'',
            name: '',
            cinemaRoomsCount: '',
            cinemaRoomRows: '',
            cinemaRoomColumns: '',
            defaultPrice: '',
            vipPrice: '',
        }
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCinemaRoomsChange = this.handleCinemaRoomsChange.bind(this);
        this.handleSubmitCinemaInfoClick = this.handleSubmitCinemaInfoClick.bind(this);
        this.handleDefaultPriceChange = this.handleDefaultPriceChange.bind(this);
        this.handleVipPriceChange = this.handleVipPriceChange.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    validateIntNumber(number){
        let result = /^\d+$/;
        return result.test(String(number));
    }

    validateDoubleNumber(number){
        let result = /^\d+([.,]\d+)?$/;
        return result.test(String(number));
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

    handleCinemaRoomsChange(event){
        this.setState({
            cinemaRoomsCount: event.target.value, 
        });
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

    handleSubmitCinemaInfoClick(){
        this.props.callBackFromParent({
            city: this.state.city,
            name: this.state.name,
            cinemaRoomsCount: parseInt(this.state.cinemaRoomsCount),
            defaultSeatPrice: this.state.defaultPrice,
            vipSeatPrice: this.state.vipPrice,
        });
    }

    handleCancelClick(){
        this.props.callBackCancelGeneralCinemaInfoInput();
    }

    render(){
        return(
            <div>
                <h3>
                    Input general cinema information
                </h3>
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
                    <strong>Number of cinema rooms : </strong>
                </h4> 
                <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    value={this.state.cinemaRoomsCount} 
                    onChange={this.handleCinemaRoomsChange}
                    placeholder="Rooms"
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
                    onClick={this.handleSubmitCinemaInfoClick} 
                    disabled={
                        !(
                            this.validateDoubleNumber(this.state.defaultPrice) &&
                            this.validateDoubleNumber(this.state.vipPrice) &&
                            this.validateIntNumber(this.state.cinemaRoomsCount) && 
                            this.state.city && 
                            this.state.name
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
            </div>
        )
    }
}