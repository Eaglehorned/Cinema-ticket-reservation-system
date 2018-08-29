import React from 'react';
import { Button } from 'react-bootstrap';
import ListItem from '../General/ListItem';

const DisplayCinemaRoomsList = (props) =>{
    return(
        <div className="list-container">
            {
                props.list.map((el)=>
                    <ListItem
                        key={el.cinemaRoomId}
                        displayedParams={[
                            {label: "Name", value: el.name}
                        ]}
                        callBackFromParent={props.handleElementClick}
                        id={el.cinemaRoomId}
                        mode="edit"
                    />
                )
            }
            <div className="button-container"> 
                <Button
                    bsStyle="primary"
                    onClick={props.handleListButtonClick}
                >
                    Add cinema room
                </Button>
            </div>
        </div>
    );
}

export default DisplayCinemaRoomsList;
