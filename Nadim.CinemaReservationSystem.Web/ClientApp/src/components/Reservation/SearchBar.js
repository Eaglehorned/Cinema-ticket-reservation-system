import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup} from 'react-bootstrap';
import { DatePicker } from 'antd';
import moment from 'moment';
import applicationService from '../../Services/ApplicationService';

class SearchBar extends Component{
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
        this.props.history.push(`${this.props.match.url}${applicationService.convertFiltersToFilterString(filters)}`);
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

export default withRouter(SearchBar);