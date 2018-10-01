import React from 'react';
import '../../styles/FilmCard.css';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const FilmCard = (props) =>{
    return(
        <div className="film-card">
            <div className="post-card-image-container">
                <Link 
                    to={`/film/${props.film.filmId}`}
                >   
                    <img alt="film poster" className="post-card-image" src={props.film.posterImage}/>
                </Link>
            </div>
            <div className="film-card-name">
                <Link
                    to={`/film/${props.film.filmId}`}
                >
                    {props.film.name}
                </Link>  
            </div>
            <div>
                <Button
                    className="film-card-button"
                    onClick={()=> props.history.push(`/film/${props.film.filmId}`)}
                >
                    Buy
                </Button>
            </div>
        </div>
    );
}

export default withRouter(FilmCard);