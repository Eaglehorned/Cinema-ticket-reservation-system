import React, {Component} from 'react';
import {DropdownButton, MenuItem, FormGroup, ButtonGroup} from 'react-bootstrap';
import { DatePicker } from 'antd';
import moment from 'moment';

export default class SearchBar extends Component{
    displayName = SearchBar.displayName;

    constructor(props){
        super(props);
        this.state={
            //filmList: [],
            //chosenFilm: undefined,
            chosenStartDate: moment(),
            chosenEndDate: moment().add(1, 'day')
        }

        //this.getFilmList();

        this.getSessionList({
            startDate: moment().format('L'),
            endDate: moment().add(14, 'days').format('L')
        });
    }

    // getFilmList = () => {
    //     fetch('api/films', {
    //         method: 'GET',
    //         headers:{
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': `bearer ${this.props.token}`
    //         }
    //     })
    //     .then(response => {
    //         if (response.ok){
    //             return response.json();
    //         }
    //         if (response.status === 400){
    //             return response.json().then((err) => {
    //                 throw new Error(`Bad request. ${err.details}`);
    //             });
    //         }
    //         if (response.status === 401){
    //             throw new Error('You need to authorize to do that action.');
    //         }
    //         if (response.status === 404){
    //             return response.json().then((err) => {
    //                 throw new Error(`Not found. ${err.details}`);
    //             });
    //         }
    //     })
    //     .then(parsedJson => {
    //         this.setState({
    //             filmList: parsedJson.requestedData,
    //         });
    //     })
    //     .catch(error => this.props.callBackInformWithMessage(
    //         { 
    //             text: error.message,
    //             isError: true
    //         })
    //     );
    // }

    // handleSelectFilm = (eventKey) =>{
    //     this.setState({
    //         chosenFilm: this.state.filmList[eventKey]
    //     });
    //     this.getSessionList({
    //         filmId: this.state.filmList[eventKey].filmId,
    //         startDate: this.state.chosenStartDate.format('L'),
    //         endDate: this.state.chosenEndDate.format('L')
    //     })
    // }

    handleChangeDate = (time) =>{
        const nextDay = moment(time);
        nextDay.add(1, 'day');
        this.setState({
            chosenStartDate: time,
            chosenEndDate: nextDay
        });
        this.getSessionList({
            //filmId: this.state.chosenFilm ? this.state.chosenFilm.filmId : undefined,
            startDate: time.format('L'),
            endDate: nextDay.format('L')
        })
    }

    getSessionList = (filters) =>{
        let filterString = '';
        for (let prop in filters){
            if(filters[prop]){ 
                if (filterString === ''){
                    filterString = `${prop}=${filters[prop]}`;
                }
                else{
                    filterString = filterString.concat(`&${prop}=${filters[prop]}`);
                }
            }
        }

        fetch(`api/sessions?${filterString}`, {
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
        })
        .catch(error => this.props.callBackInformWithMessage(
            { 
                text: error.message,
                isError: true
            })
        );
    }

    renderFiltersContent = () =>{
        return(
            <React.Fragment>
                {/* <ButtonGroup 
                    justified
                    className="dropdownbutton-container display-inline-block"
                >
                    <DropdownButton
                        bsStyle="default"
                        title={this.state.chosenFilm ? this.state.chosenFilm.name : 'Choose film'}
                        id={"choose-film-dropdown"}
                        disabled={this.state.filmList.length === 0}
                        block={true}
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
                </ButtonGroup> */}
                <DatePicker
                    className="display-inline-block"
                    onChange={this.handleChangeDate}
                    value={this.state.chosenStartDate}
                />
            </React.Fragment>   
        );
    }

    render(){
        return(
            <React.Fragment>
                <FormGroup>
                    {this.renderFiltersContent()}
                </FormGroup>
            </React.Fragment>
        );
    }
}