import React, {Component} from 'react';
import { FormGroup} from 'react-bootstrap';
import { DatePicker } from 'antd';
import moment from 'moment';

export default class SearchBar extends Component{
    displayName = SearchBar.displayName;

    constructor(props){
        super(props);
        this.state={
            chosenStartDate: moment(),
            chosenEndDate: moment().add(1, 'day')
        }

        this.getSessionList({
            startDate: moment().format('L'),
            endDate: moment().add(14, 'days').format('L')
        });
    }

    handleChangeDate = (time) =>{
        const nextDay = moment(time);
        nextDay.add(1, 'day');
        this.setState({
            chosenStartDate: time,
            chosenEndDate: nextDay
        });
        this.getSessionList({
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
            if (response.status === 500){
                return response.json().then((err) => {
                    throw new Error(`${err.details}`);
                });
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