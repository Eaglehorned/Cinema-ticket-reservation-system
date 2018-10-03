import React from 'react';
import CinemaSessionTimes from './CinemaSessionTimes';
import filmService from '../../Services/FilmService';

const DisplayCinemasSessionsTimes = (props) =>{
    const cinemasIds = filmService.getFilmSessionsCinemasIds(props.sessions);
    
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