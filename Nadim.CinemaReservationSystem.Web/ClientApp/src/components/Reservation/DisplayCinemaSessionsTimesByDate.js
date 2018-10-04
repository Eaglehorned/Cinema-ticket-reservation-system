import React from 'react';
import moment from 'moment';
import DisplayCinemasSessionsTimes from './DisplayCinemasSessionsTimes';
import filmService from '../../Services/FilmService';


const DisplayCinemaSessionsTimesByDate = (props) =>{
    const dates = filmService.getFilmSessionsDates(props.sessions);
    return(
        <div>
            {dates.map((el, index)=>{
                return(
                    <div className="session-times-by-date-item"
                        key={index} 
                    >
                        <div className="date">
                            {moment(el).format('D MMMM')}
                        </div>
                        <DisplayCinemasSessionsTimes
                            sessions={props.sessions.filter((s) => moment(s.beginTime).format('L') === el)}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default(DisplayCinemaSessionsTimesByDate);