import React from 'react';
import { withRouter } from 'react-router-dom';

const CinemaSessionTimes = (props) =>{
    return(
        <div className="cinema-session-times-container">
            <div className="cinema-info">
                <div className="font-x-large font-bold">
                    {props.sessions[0].cinema.name}
                </div>
            </div>
        </div>
    );
}

export default withRouter(CinemaSessionTimes);