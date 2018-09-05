import React, {Component} from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import SubmitCancelButtons from '../General/SubmitCancelButtons';

export default class SeatTypeChange extends Component{
    displayName = SeatTypeChange.displayName;

    constructor(props){
        super(props);
        this.state={
            chosenType: this.props.seatInfo.type
        }
    }

    handleTypeClick = (value) =>{
        this.setState({
            chosenType: value,
        });
    }

    render(){
        return(
            <fieldset>
                <h1 className="font-bold">
                    Switch seat type
                </h1>
                {this.state.chosenType === this.props.seatInfo.type 
                    ? <p>Current type : {this.state.chosenType}</p>
                    : <p>Current type : <span className="font-bold font-italic">{this.state.chosenType}</span></p>
                }
                <p>Seat row : {this.props.seatInfo.row + 1}</p>
                <p>Seat column : {this.props.seatInfo.column + 1}</p> 
                <ButtonToolbar>
                    <DropdownButton
                        className="Dropdown"
                        title="Choose type"
                        id="dropdown-size-large"
                    >
                        <MenuItem 
                            eventKey="1" 
                            onClick={this.handleTypeClick.bind(this, 'default')}
                        >
                            Default
                        </MenuItem>
                        <MenuItem 
                            eventKey="2" 
                            onClick={this.handleTypeClick.bind(this, 'vip')}
                        >
                            Vip
                        </MenuItem>
                    </DropdownButton>
                </ButtonToolbar>
                <SubmitCancelButtons
                    handleSubmitClick={() => this.props.callBackSubmitSeatTypeChange(this.state.chosenType)}
                    handleCancelClick={this.props.callBackCancelSeatTypeChange}
                />
            </fieldset>
        );
    }
}