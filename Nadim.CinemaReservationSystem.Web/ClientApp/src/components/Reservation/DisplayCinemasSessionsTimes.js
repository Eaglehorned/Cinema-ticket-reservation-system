import React from 'react';
import CinemaSessionTimes from './CinemaSessionTimes';

const DisplayCinemasSessionsTimes = (props) =>{
    const cinemasIds = props.sessions.map((el) =>el.cinema.cinemaId).filter((e, i, a) => a.indexOf(e) === i);
    
    return(
        <div>
            {cinemasIds.map((cinemaId) =>
                <CinemaSessionTimes
                    key={cinemaId}
                    sessions={props.sessions.filter((el) => 
                        el.cinema.cinemaId === cinemaId
                    )}
                />
            )}
        </div>
    );
}

export default(DisplayCinemasSessionsTimes);