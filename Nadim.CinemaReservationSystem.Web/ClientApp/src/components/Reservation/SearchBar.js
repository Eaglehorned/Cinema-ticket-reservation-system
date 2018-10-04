import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { DatePicker } from 'antd';
import moment from 'moment';
import applicationService from '../../Services/ApplicationService';
import '../../styles/SearchBar.css';

class SearchBar extends Component{
    displayName = SearchBar.displayName;

    constructor(props){
        super(props);
        this.state={
            chosenStartDate: moment(),
            chosenEndDate: moment().add(1, 'day')
        }
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
        this.props.history.push(`${this.props.match.url}${applicationService.convertFiltersToFilterString(filters)}`);
    }

    render(){
        return(
            <div className="search-bar-container">
                <DatePicker
                    size={"large"}
                    className="display-inline-block"
                    onChange={this.handleChangeDate}
                    value={this.state.chosenStartDate}
                /> 
            </div>
        );
    }
}

export default withRouter(SearchBar);