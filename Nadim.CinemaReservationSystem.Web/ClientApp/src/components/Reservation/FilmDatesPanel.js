import React from 'react';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import applicationService from '../../Services/ApplicationService';
import '../../styles/FilmDatesPanel.css';

const FilmDatesPanel = (props) =>{
    return(
        <div className="film-dates-panel">
            <div className="date-container">
                <Link 
                    to={`${props.match.url}${applicationService.getFromTodayTimeSearchString()}`}
                >
                    <div className="date">
                        All days
                    </div>
                </Link>
            </div>
            {props.dates.map((el, i) => 
                <div className="date-container"
                    key={i}
                >
                    <Link 
                        to={`${props.match.url}${applicationService.convertFiltersToFilterString({
                            startDate: moment(el).format('L'),
                            endDate: (moment(el).add(1, 'day')).format('L')
                        })}`}
                    >
                        <div className="date">
                            {moment(el).format('D MMM')}
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default withRouter(FilmDatesPanel);