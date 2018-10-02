import React from 'react';
import SessionCard from './SessionCard';
import sessionService from '../../Services/SessionService';

const CinemaSessionTimes = (props) =>{    
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
                {sessionService.sortSessionByTime(props.sessions).map(el =>
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