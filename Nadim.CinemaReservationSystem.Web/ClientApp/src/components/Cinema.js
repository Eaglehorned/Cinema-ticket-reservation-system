import React, {Component} from 'react';
import { ButtonToolbar, DropdownButton, MenuItem, Button} from 'react-bootstrap';
import EditCinemaInfo from './EditCinemaInfo';
import AddCinema from './AddCinema';

export default class Cinema extends Component{
    displayName = Cinema.displayName;

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <AddCinema 
                    username={this.props.username}
                    token={this.props.token}
                />
                <EditCinemaInfo/>
            </div>
        )
    }
}
