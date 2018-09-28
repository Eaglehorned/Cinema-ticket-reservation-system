import React from 'react';
import '../../styles/EventCard.css';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const EventCard = (props) =>{
    return(
        <div className="event-card">
            <div className="post-card-image-container">
                <Link 
                    to={`/film/${props.film.filmId}`}
                >   
                    <img className="post-card-image" src={props.film.posterImage}/>
                </Link>
            </div>
            <div className="event-card-name">
                <Link
                    to={`/film/${props.film.filmId}`}
                >
                    {props.film.name}
                </Link>  
            </div>
            <div>
                <Button
                    className="event-card-button"
                    onClick={()=> props.history.push(`/film/${props.film.filmId}`)}
                >
                    Buy
                </Button>
            </div>
        </div>
    );
}

export default withRouter(EventCard);