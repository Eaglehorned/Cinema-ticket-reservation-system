import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const CinemaRoomListDropDown = (props) =>{
    return(
        <DropdownButton
            bsStyle="default"
            title="Choose cinema room"
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
                    {el.name}
                </MenuItem>
            )
        }
    </DropdownButton>
    );
}

export default CinemaRoomListDropDown;