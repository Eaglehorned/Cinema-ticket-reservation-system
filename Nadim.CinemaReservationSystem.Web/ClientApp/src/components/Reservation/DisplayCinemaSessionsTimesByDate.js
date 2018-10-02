import React from 'react';
import moment from 'moment';
import DisplayCinemasSessionsTimes from './DisplayCinemasSessionsTimes';


const DisplayCinemaSessionsTimesByDate = (props) =>{
    const dates = props.sessions.map((el) =>moment(el.beginTime).format('L')).filter((e, i, a) => a.indexOf(e) === i);
    return(
        <div>
            {dates.map((el, i)=>{
                return(
                    <div className="session-times-by-date-item"
                        key={i} 
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