import React, {Component} from 'react'

export default class AddCinemaInfo extends Component{
    displayName = AddCinemaInfo.name;

    constructor(props){
        super(props);
        this.state = {
            // city:'',
            // name: '',
            // cinemaRoomsCount: '',
            // rowsCount: '',
            // columnsCount: ''
            city:'ss',
            name: 'sss',
            cinemaRoomsCount: 3,
            rowsCount: 2,
            columnsCount: 3
        }
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCinemaRoomsChange = this.handleCinemaRoomsChange.bind(this);
        this.handleRowsChange = this.handleRowsChange.bind(this);
        this.handleColumnsChange = this.handleColumnsChange.bind(this);
        this.handleAddCinemaClick = this.handleAddCinemaClick.bind(this);
    }

    validateNumber(number){
        let result = /\d+/;
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
            rowsCount: event.target.value, 
        });
    }
    
    handleColumnsChange(event){
        this.setState({
            columnsCount: event.target.value, 
        });
    }

    handleAddCinemaClick(event){
        event.preventDefault();
        this.props.callBackFromParent({
            rows: this.state.rowsCount,
            columns: this.state.columnsCount,
            city: this.state.city,
            name: this.state.name,
            cinemaRoomsCount: this.state.cinemaRoomsCount
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
                    value={this.state.rowsCount} 
                    onChange={this.handleRowsChange}
                    placeholder="Rows"
                />
                <h4>
                    <strong>Number of places in row in cinema room : </strong>
                </h4> 
                <input
                    type="text" 
                    className="form-control form-control-sm" 
                    value={this.state.columnsCount} 
                    onChange={this.handleColumnsChange}
                    placeholder="Columns"
                />
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={this.handleAddCinemaClick} 
                    disabled={
                        !(
                            this.validateNumber(this.state.cinemaRoomsCount) && 
                            this.validateNumber(this.state.rowsCount) && 
                            this.validateNumber(this.state.columnsCount) && 
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