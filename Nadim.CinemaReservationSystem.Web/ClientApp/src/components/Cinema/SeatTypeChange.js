import React, {Component} from 'react';
import { ButtonToolbar, DropdownButton, MenuItem, Button} from 'react-bootstrap';

export default class SeatTypeChange extends Component{
    displayName = SeatTypeChange.displayName;

    constructor(props){
        super(props);
        this.state={
            chosenType: this.props.seatInfo.type
        }
        this.handleTypeClick = this.handleTypeClick.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    handleTypeClick(value){
        this.setState({
            chosenType: value,
        });
    }

    handleSubmitClick(){
        this.props.callBackSubmitSeatTypeChange(this.state.chosenType);
    }

    handleCancelClick(){
        this.props.callBackCancelSeatTypeChange();
    }

    render(){
        return(
            <fieldset>
                <h1 
                    className="font-bold"
                >
                    Switch seat type
                </h1>
                {this.state.chosenType === this.props.seatInfo.type ? 
                    <p>Current type : {this.state.chosenType}</p> : 
                    <p>Current type : <span className="font-bold font-italic">{this.state.chosenType}</span></p>
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
                <div>
                    <Button 
                        bsStyle="primary" 
                        onClick={this.handleSubmitClick}
                    > 
                        Submit
                    </Button>
                    <Button 
                        onClick={this.handleCancelClick}
                    > 
                        Cancel
                    </Button>
                </div>
            </fieldset>
        );
    }
}