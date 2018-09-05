import React from 'react';
import { Button } from 'react-bootstrap';
import FilmListItem from './FilmListItem';

const DisplayFilmList = (props) =>{
    return(
        <div className="list-container">
            {
                props.list.map((el)=>
                    <FilmListItem
                        key={el.filmId}
                        callBackFromParent={props.handleElementClick}
                        film={el}
                    />
                )
            }
            <div className="button-container"> 
                <Button
                    bsStyle="primary"
                    onClick={props.handleListButtonClick}
                >
                    Create film
                </Button>
            </div>
        </div>
    );
}

export default DisplayFilmList;