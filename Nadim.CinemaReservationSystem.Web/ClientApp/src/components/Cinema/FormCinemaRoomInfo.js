import React, { Component } from 'react';
import cinemaService from '../../Services/CinemaService';
import InputStringFormGroup from '../General/InputStringFormGroup';
import InputIntFormGroup from '../General/InputIntFromGroup';
import SubmitCancelButtons from '../General/SubmitCancelButtons';

export default class FormCinemaRoomInfo extends Component{
    displayName = FormCinemaRoomInfo.displayName;

    constructor(props){
        super(props);
        this.state = {
            rows: this.props.cinemaRoomInfo ? this.props.cinemaRoomInfo.rows : '',
            columns: this.props.cinemaRoomInfo ? this.props.cinemaRoomInfo.columns : '',
            name: this.props.cinemaRoomInfo ? this.props.cinemaRoomInfo.name : '',
            showHint: this.props.needToShowHint ? this.props.needToShowHint: false,
            displayedComponents: this.props.displayedComponents 
            ? this.props.displayedComponents 
            : {
                name: true,
                rows: true, 
                columns: true,
                buttons: true
            }
        }
    }

    handleSubmitClick = () =>{
        this.setState({
            showHint: true
        });
        if (cinemaService.validateCinemaRoomInfo(
            this.state.displayedComponents,
            this.state.rows,
            this.state.columns,
            this.state.name
        )){
            this.props.callBackReceiveCinemaRoomInfo({
                rows : this.state.rows,
                columns: this.state.columns,
                name: this.state.name
            });
        }
    }

    handleCancelClick = () =>{
        this.props.callBackCancel();
    }

    informParentAboutInfoChange = (rows, columns, name) =>{
        this.props.callBackHandleChangeCinemaRoomInfo({
            info: 
            {
                rows : rows,
                columns: columns,
                name: name
            },
            allowSubmit: cinemaService.validateCinemaRoomInfo(
                this.state.displayedComponents,
                rows,
                columns,
                name
            ) 
        });
    }

    handleRowsChange = (event) =>{
        this.setState({
            rows: event.target.value
        });
        if (this.props.callBackHandleChangeCinemaRoomInfo){
            this.informParentAboutInfoChange(
                event.target.value, 
                this.state.columns,
                this.state.name
            );
        }
    }
    
    handleColumnsChange = (event) =>{
        this.setState({
            columns: event.target.value
        });
        if (this.props.callBackHandleChangeCinemaRoomInfo){
            this.informParentAboutInfoChange(
                this.state.rows,
                event.target.value, 
                this.state.name
            );
        }
    }

    handleNameChange = (event) =>{
        this.setState({
            name: event.target.value
        });
        if (this.props.callBackHandleChangeCinemaRoomInfo){
            this.informParentAboutInfoChange(
                this.state.rows,
                this.state.columns, 
                event.target.value
            );
        }
    }

    render(){
        return(
            <fieldset>
                <InputStringFormGroup
                    isShown={this.state.displayedComponents.name}
                    label="Cinema room name"
                    value={this.state.name}
                    handleValueChange={this.handleNameChange}
                    showHint={this.state.showHint}
                />
                <InputIntFormGroup
                    isShown={this.state.displayedComponents.rows}
                    label="Rows"
                    value={this.state.rows}
                    handleValueChange={this.handleRowsChange}
                    showHint={this.state.showHint}
                />
                <InputIntFormGroup
                    isShown={this.state.displayedComponents.columns}
                    label="Columns"
                    value={this.state.columns}
                    handleValueChange={this.handleColumnsChange}
                    showHint={this.state.showHint}
                />
                <SubmitCancelButtons
                    isShown={this.state.displayedComponents.buttons ? true : false}
                    handleSubmitClick={this.handleSubmitClick}
                    handleCancelClick={this.handleCancelClick}
                />
            </fieldset>
        );
    }
}