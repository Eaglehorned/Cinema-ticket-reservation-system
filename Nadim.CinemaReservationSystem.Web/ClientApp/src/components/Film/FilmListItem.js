import React from 'react';
import {Button} from 'react-bootstrap';
import DisplayInfoBoxField from '../General/DisplayInfoBoxField';

const FilmListItem = (props) =>{
    return(
        <div                 
            className="list-box-container font-large"
        >
            <div>
                <DisplayInfoBoxField
                    label="Name"
                    value={props.film.name}
                />
            </div>
            <Button
                onClick={() => props.callBackFromParent(props.film.filmId)}
            >
                Edit
            </Button>
        </div>
    );
}

export default FilmListItem;