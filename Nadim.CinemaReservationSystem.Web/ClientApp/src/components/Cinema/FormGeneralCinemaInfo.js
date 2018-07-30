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
            displayedComponents: this.props.displayedComponents ? 
                                    this.props.displayedComponents : 
                                    {
                                        city: true,
                                        name: true,
                                        cinemaRoomsCount: true,
                                        defaultSeatPrice: true,
                                        vipSeatPrice: true,
                                    }
        }
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCinemaRoomsChange = this.handleCinemaRoomsChange.bind(this);
        this.handleSubmitCinemaInfoClick = this.handleSubmitCinemaInfoClick.bind(this);
        this.handleDefaultPriceChange = this.handleDefaultPriceChange.bind(this);
        this.handleVipPriceChange = this.handleVipPriceChange.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.allowSubmitClick = this.allowSubmitClick.bind(this);
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
        if (this.state.displayedComponents.cinemaRoomsCount && !this.validateIntNumber(this.state.cinemaRoomsCount)){
            return false;
        }
        if (this.state.displayedComponents.name && !this.state.name){
            return false;
        }
        return true;
    }

    render(){
        return(
            <div>
                <h3>
                    Input general cinema information
                </h3>
                <br/>
                <div
                    className={this.state.displayedComponents.city ? '' : 'hidden'}
                >
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
                </div>
                <div
                    className={this.state.displayedComponents.name ? '' : 'hidden'}
                >
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
                </div>
                <div
                    className={this.state.displayedComponents.cinemaRoomsCount ? '' : 'hidden'}
                >
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
                </div>
                <div
                    className={this.state.displayedComponents.defaultSeatPrice ? '' : 'hidden'}
                >
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
                </div>
                <div
                    className={this.state.displayedComponents.vipSeatPrice ? '' : 'hidden'}
                >
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
                </div>
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
            </div>
        )
    }
}