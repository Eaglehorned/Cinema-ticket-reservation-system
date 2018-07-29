import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class FormCinemaRoomInfo extends Component{
    displayName = FormCinemaRoomInfo.displayName;

    constructor(props){
        super(props);
        this.state = {
            rows: '',
            columns: '',
            name: '',
        }
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleRowsChange = this.handleRowsChange.bind(this);
        this.handleColumnsChange = this.handleColumnsChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleSubmitClick(){
        this.props.callBackReceiveCinemaRoomInfo({
            rows : this.state.rows,
            columns: this.state.columns,
            name: this.state.name,
        })
    }

    handleCancelClick(){
        this.props.callBackCancel();
    }

    validateIntNumber(number){
        let result = /^\d+$/;
        return result.test(String(number));
    }

    handleRowsChange(event){
        this.setState({
            rows: event.target.value, 
        });
    }
    
    handleColumnsChange(event){
        this.setState({
            columns: event.target.value, 
        });
    }

    handleNameChange(event){
        this.setState({
            name: event.target.value, 
        });
    }

    render(){
        return(
            <div>
                <h3>
                    Input cinema room information
                </h3>
                <h4>
                    <strong>Cinema room name : </strong>
                </h4> 
                <input
                    type="text" 
                    className="form-control form-control-sm" 
                    value={this.state.name} 
                    onChange={this.handleNameChange}
                    placeholder="Name"
                />
                <h4>
                    <strong>Number of rows : </strong>
                </h4> 
                <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    value={this.state.rows} 
                    onChange={this.handleRowsChange}
                    placeholder="Rows"
                />
                <h4>
                    <strong>Number of places in row : </strong>
                </h4> 
                <input
                    type="text" 
                    className="form-control form-control-sm" 
                    value={this.state.columns} 
                    onChange={this.handleColumnsChange}
                    placeholder="Columns"
                />
                <Button 
                    bsStyle="primary"
                    disabled={
                        !(
                            this.validateIntNumber(this.state.columns) && 
                            this.validateIntNumber(this.state.rows) &&
                            this.state.name
                        )}
                    onClick={this.handleSubmitClick}
                >
                    Submit
                </Button>
                <Button 
                    bsStyle="default"
                    onClick={this.handleCancelClick}
                >
                    Cancel
                </Button>
            </div>
        )
    }
}