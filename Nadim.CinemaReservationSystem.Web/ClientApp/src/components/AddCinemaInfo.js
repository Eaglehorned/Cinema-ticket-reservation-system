import React, {Component} from 'react'

export default class AddCinemaInfo extends Component{
    displayName = AddCinemaInfo.name;

    constructor(props){
        super(props);
        this.state = {
            city:'ss',
            name: 'sss',
            cinemaRoomsCount: 3,
            cinemaRoomRows: 2,
            cinemaRoomColumns: 3,
            defaultPrice: 0,
            vipPrice: 0,
        }
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCinemaRoomsChange = this.handleCinemaRoomsChange.bind(this);
        this.handleRowsChange = this.handleRowsChange.bind(this);
        this.handleColumnsChange = this.handleColumnsChange.bind(this);
        this.handleAddCinemaClick = this.handleAddCinemaClick.bind(this);
        this.handleDefaultPriceChange = this.handleDefaultPriceChange.bind(this);
        this.handleVipPriceChange = this.handleVipPriceChange.bind(this);
    }

    validateNumber(number){
        let result = /^\d+$/;
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

    handleRowsChange(event){
        this.setState({
            cinemaRoomRows: event.target.value, 
        });
    }
    
    handleColumnsChange(event){
        this.setState({
            cinemaRoomColumns: event.target.value, 
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

    handleAddCinemaClick(event){
        event.preventDefault();
        this.props.callBackFromParent({
            city: this.state.city,
            name: this.state.name,
            cinemaRoomRows: parseInt(this.state.cinemaRoomRows),
            cinemaRoomColumns: parseInt(this.state.cinemaRoomColumns),
            cinemaRoomsCount: parseInt(this.state.cinemaRoomsCount),
            defaultPrice: parseInt(this.state.defaultPrice),
            vipPrice: parseInt(this.state.vipPrice),
        });
    }

    render(){
        return(
            <div>
                <h1>Add Cinema</h1>
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
                    <strong>Number of rows in cinema room : </strong>
                </h4> 
                <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    value={this.state.cinemaRoomRows} 
                    onChange={this.handleRowsChange}
                    placeholder="Rows"
                />
                <h4>
                    <strong>Number of places in row : </strong>
                </h4> 
                <input
                    type="text" 
                    className="form-control form-control-sm" 
                    value={this.state.cinemaRoomColumns} 
                    onChange={this.handleColumnsChange}
                    placeholder="Columns"
                />
                <h4>
                    <strong>Price for default seat USD : </strong>
                </h4> 
                <input
                    type="text" 
                    className="form-control form-control-sm" 
                    value={this.state.defaultPrice} 
                    onChange={this.handleDefaultPriceChange}
                    placeholder="Columns"
                />
                <h4>
                    <strong>Price for VIP seat USD : </strong>
                </h4> 
                <input
                    type="text" 
                    className="form-control form-control-sm" 
                    value={this.state.vipPrice} 
                    onChange={this.handleVipPriceChange}
                    placeholder="Columns"
                />
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={this.handleAddCinemaClick} 
                    disabled={
                        !(
                            this.validateNumber(this.state.defaultPrice) &&
                            this.validateNumber(this.state.vipPrice) &&
                            this.validateNumber(this.state.cinemaRoomsCount) && 
                            this.validateNumber(this.state.cinemaRoomRows) && 
                            this.validateNumber(this.state.cinemaRoomColumns) && 
                            this.state.city && 
                            this.state.name
                        )
                    }
                >
                    Add
                </button>
            </div>
        )
    }
}