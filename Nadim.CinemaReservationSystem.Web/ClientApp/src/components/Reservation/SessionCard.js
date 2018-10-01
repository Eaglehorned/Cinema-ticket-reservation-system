import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import '../../styles/SessionCard.css';

const SessionCard = (props) =>{
    return(
        <div className="session-card"
            onClick={() => props.history.push(`/sessions/${props.session.sessionId}`)}
        >
            <div className="time">
                {moment(props.session.beginTime).format('LT')}
            </div>
            <div className="location">
                {props.session.cinemaRoom.name}
            </div>
        </div>
    );
}

export default withRouter(SessionCard);