import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class FormCinemaRoomInfo extends Component{
    displayName = FormCinemaRoomInfo.displayName;

    constructor(props){
        super(props);
        this.state = {
            rows: this.props.cinemaRoomInfo ? this.props.cinemaRoomInfo.rows : '',
            columns: this.props.cinemaRoomInfo ? this.props.cinemaRoomInfo.columns : '',
            name: this.props.cinemaRoomInfo ? this.props.cinemaRoomInfo.name : '',
            displayedComponents: this.props.displayedComponents ? 
            this.props.displayedComponents : 
            {
                name: true,
                rows: true, 
                columns: true
            }
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
            name: this.state.name
        });
    }

    handleCancelClick(){
        this.props.callBackCancel();
    }

    validateIntNumber(number){
        const result = /^\d+$/;
        return result.test(String(number));
    }

    handleRowsChange(event){
        this.setState({
            rows: event.target.value
        });
    }
    
    handleColumnsChange(event){
        this.setState({
            columns: event.target.value
        });
    }

    handleNameChange(event){
        this.setState({
            name: event.target.value
        });
    }

    allowSubmitClick(){
        if (this.state.displayedComponents.rows && !this.validateIntNumber(this.state.rows)){
            return false;
        }
        if (this.state.displayedComponents.columns && !this.validateIntNumber(this.state.columns)){
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
                    Input cinema room information
                </h2>
                <fieldset
                    className={this.state.displayedComponents.name ? '' : 'hidden'}
                >
                    <label htmlFor="nameInput" className="font-bold-large">
                        Cinema room name :
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
                    className={this.state.displayedComponents.rows ? '' : 'hidden'}
                >
                    <label htmlFor="rowsInput" className="font-bold-large">
                        Number of rows : 
                    </label> 
                    <input 
                        type="text" 
                        className=
                        {
                            `form-control form-control-sm
                            ${
                                this.validateIntNumber(this.state.rows)
                                ? ''
                                :' error'
                            }`
                        }
                        id="rowsInput"
                        value={this.state.rows} 
                        onChange={this.handleRowsChange}
                        placeholder="Rows"
                    />
                </fieldset>
                <fieldset
                    className={this.state.displayedComponents.columns ? '' : 'hidden'}
                >
                <label htmlFor="columnsInput" className="font-bold-large">
                    Number of places in row : 
                </label> 
                    <input
                        type="text" 
                        className=
                        {
                            `form-control form-control-sm
                            ${
                                this.validateIntNumber(this.state.columns)
                                ? ''
                                :' error'
                            }`
                        }
                        id="columnsInput"
                        value={this.state.columns} 
                        onChange={this.handleColumnsChange}
                        placeholder="Columns"
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
        );
    }
}