import React from 'react';
import moment from 'moment';
import SessionCard from './SessionCard';

const CinemaSessionTimes = (props) =>{

    const sortSessionByTime = (sessions) =>{
        return sessions.sort((a, b)=>{
            if (moment(a.beginTime) > moment(b.beginTime)){
                return 1;
            }
            if(moment(a.beginTime) < moment(b.beginTime)){
                return -1;
            }
            return 0;
        });
    }
    
    return(
        <div className="cinema-session-times-container">
            <div className="cinema-info">
                <div className="heading">
                    {props.sessions[0].cinema.name}
                </div>
                <div className="location">
                    {props.sessions[0].cinema.city}
                </div>
            </div>
            <div className="session-cards-container">
                {sortSessionByTime(props.sessions).map(el =>
                    <SessionCard
                        key={el.sessionId}
                        session={el}
                    />
                )}
            </div>
        </div>
    );
}

export default CinemaSessionTimes;