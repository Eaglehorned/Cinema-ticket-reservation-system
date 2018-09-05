import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const CinemaListDropDown = (props) =>{
    return(
        <DropdownButton
            bsStyle="default"
            title="Choose film"
            id={props.id}
            disabled={props.list.length === 0}
        >
        {
            props.list.map((el, i) => 
                <MenuItem
                    key={i}
                    eventKey={i}
                    onSelect={props.handleElementSelect}
                >
                    {`${el.name}, ${el.city}`}
                </MenuItem>
            )
        }
    </DropdownButton>
    );
}

export default CinemaListDropDown;