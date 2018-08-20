import React, {Component} from 'react';
import {DropdownButton, MenuItem, Button, FormGroup} from 'react-bootstrap';

export default class SearchBar extends Component{
    displayName = SearchBar.displayName;

    constructor(props){
        super(props);
        this.state={
            filmList: [],
            chosenFilm: undefined
        }

        this.getFilmList();
    }

    getFilmList = () => {
        fetch('api/films', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
        })
        .then(response => {
            if (response.ok){
                return response.json();
            }
            if (response.status === 400){
                return response.json().then((err) => {
                    throw new Error(`Bad request. ${err.details}`);
                });
            }
            if (response.status === 401){
                throw new Error('You need to authorize to do that action.');
            }
            if (response.status === 404){
                return response.json().then((err) => {
                    throw new Error(`Not found. ${err.details}`);
                });
            }
        })
        .then(parsedJson => {
            this.setState({
                filmList: parsedJson.requestedData,
            });
        })
        .catch(error => this.props.callBackInformWithMessage(
            { 
                text: error.message,
                isError: true
            })
        );
    }

    handleSelectFilm = (eventKey) =>{
        this.setState({
            chosenFilm: this.state.filmList[eventKey]
        });
    }

    handleSearchClick = () =>{
        this.getSessionList(this.state.chosenFilm.filmId);
    }

    getSessionList = (filmId) =>{
        fetch(`api/sessions/filmId=${filmId}`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
        })
        .then(response => {
            if (response.ok){
                return response.json();
            }
            if (response.status === 400){
                return response.json().then((err) => {
                    throw new Error(`Bad request. ${err.details}`);
                });
            }
            if (response.status === 401){
                throw new Error('You need to authorize to do that action.');
            }
            if (response.status === 404){
                return response.json().then((err) => {
                    throw new Error(`Not found. ${err.details}`);
                });
            }
        })
        .then(parsedJson => {
            this.props.callBackReceiveSessionList(
                parsedJson.requestedData
            );
            this.setState({
                sessionList: parsedJson.requestedData
            });
        })
        .catch(error => this.informWithMessage(
            { 
                text: error.message,
                isError: true
            })
        );
    }

    renderChooseFilmDropDown = () =>{
        return(
            <React.Fragment>
                <DropdownButton
                    bsStyle="default"
                    title="Choose film"
                    id={"choose-film-dropdown"}
                    disabled={this.state.filmList.length === 0}
                >
                    {
                        this.state.filmList.map((el, i) => 
                            <MenuItem
                                key={i}
                                eventKey={i}
                                onSelect={this.handleSelectFilm}
                            >
                                {` ${el.name}`}
                            </MenuItem>
                        )
                    }
                </DropdownButton>
            </React.Fragment>   
        );
    }

    render(){
        return(
            <div>
                <FormGroup>
                    {this.renderChooseFilmDropDown()}
                    {this.state.chosenFilm 
                        ? <div className="font-large">
                            <span className="font-bold">
                                Chosen film :{' '}
                            </span>
                            {this.state.chosenFilm.name}
                        </div> 
                        : ''}
                </FormGroup>
                <Button
                    bsStyle="primary"
                    onClick={this.handleSearchClick}
                >
                    Search
                </Button>
            </div>
        );
    }
}