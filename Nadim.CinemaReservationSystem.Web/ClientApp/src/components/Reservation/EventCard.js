import React from 'react';
import '../../styles/EventCard.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const EventCard = (props) =>{
    console.log(props);
    return(
        <div className="event-card">
            <div className="post-card-image-container">
                <Link to={`/`}>   
                    <img className="post-card-image" src={props.film.posterImage}/>
                </Link>
            </div>
            <div className="event-card-name">
                <Link
                    to={`/`}
                >
                    {props.film.name}
                </Link>  
            </div>
            <div>
                <Button
                    className="event-card-button"
                >
                    Buy
                </Button>
            </div>
        </div>
    );
}

export default(EventCard);