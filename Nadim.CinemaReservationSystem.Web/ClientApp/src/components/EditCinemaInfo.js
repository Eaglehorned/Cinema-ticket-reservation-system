import React, {Component} from 'react';
import { ButtonToolbar, DropdownButton, MenuItem, Button} from 'react-bootstrap';

export default class EditCinemaInfo extends Component{
    displayName = EditCinemaInfo.displayName;

    constructor(props){
        super(props);
        this.state={
            cinemaList: {},
            error: '',
            cinemaChosen: false
        }
        this.renderChooseCinemaContent = this.renderChooseCinemaContent.bind(this);
        this.renderCinemaEditContent = this.renderCinemaEditContent.bind(this);
        this.getCinemaList();
    }

    getCinemaList(){
        fetch('api/Cinema/GetCinemaList', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.props.token,
            }
        }).then(response => response.json())
            .then(parsedJson => {
                console.log(parsedJson);
                if (parsedJson.resultOk){
                    this.setState({
                        cinemaList: parsedJson,
                    })
                }
                else {
                    this.setState({
                        error: parsedJson.details,
                    })
                }
            })
    }

    renderCinemaEditContent(){

    }

    renderChooseCinemaContent(){

    }

    render(){
        let content = this.state.cinemaChosen ? this.renderCinemaEditContent() : this.renderChooseCinemaContent();
        return(
            <h1>Edit cinema information</h1>
            <h3 className="error-text">
                {this.state.error}
            </h3>
            <div>

            </div>
        )
    }
}