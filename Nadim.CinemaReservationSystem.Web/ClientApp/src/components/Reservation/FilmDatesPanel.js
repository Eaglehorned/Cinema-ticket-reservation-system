import React from 'react';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import '../../styles/FilmDatesPanel.css';
import applicationService from '../../Services/ApplicationService';

const FilmDatesPanel = (props) =>{
    //TODO need to fix, now url changes and this causes requesting sessions on one day,
    // this panel get dates from sessions, so after requesting session for one day
    //this panel will have only one day
    return(
        <div className="film-dates-panel">
            {props.dates.map(el => 
                <Link 
                    to={`${props.match.url}${applicationService.convertFiltersToFilterString({
                        startDate: moment(el).format('L'),
                        endDate: (moment(el).add(1, 'day')).format('L')
                    })}`}
                    className="date"
                >
                    {moment(el).format('D MMM')}
                </Link>
            )}
        </div>
    );
}

export default withRouter(FilmDatesPanel);