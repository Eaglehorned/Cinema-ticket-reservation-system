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
        this.allowSubmitClick = this.allowSubmitClick.bind(this);
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

    allowSubmitClick(){
        if (!this.state.columns || !this.state.rows || !this.state.name){
            return false;
        }
        if(!this.validateIntNumber(this.state.columns) || !this.validateIntNumber(this.state.rows)) {
            return false;
        }
        return true;
    }

    render(){
        return(
            <fieldset>
                <h3>
                    Input cinema room information
                </h3>
                <label htmlFor="nameInput" className="font-bold-large">
                    Cinema room name :
                </label> 
                <input
                    type="text" 
                    className="form-control form-control-sm" 
                    id="nameInput"
                    value={this.state.name} 
                    onChange={this.handleNameChange}
                    placeholder="Name"
                />
                <label htmlFor="rowsInput" className="font-bold-large">
                    Number of rows : 
                </label> 
                <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    id="rowsInput"
                    value={this.state.rows} 
                    onChange={this.handleRowsChange}
                    placeholder="Rows"
                />
                <label htmlFor="columnsInput" className="font-bold-large">
                    Number of places in row : 
                </label> 
                <input
                    type="text" 
                    className="form-control form-control-sm"
                    id="columnsInput"
                    value={this.state.columns} 
                    onChange={this.handleColumnsChange}
                    placeholder="Columns"
                />
                {this.allowSubmitClick() ? 
                    '' : 
                    <h4 className="font-italic">
                        Data invalid or not entered
                    </h4>
                }
                <Button 
                    bsStyle="primary"
                    disabled={
                        !(
                            this.allowSubmitClick()
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
            </fieldset>
        )
    }
}