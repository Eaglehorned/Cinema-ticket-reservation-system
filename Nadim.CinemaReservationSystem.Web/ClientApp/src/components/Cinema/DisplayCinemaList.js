import React from 'react';
import { Button } from 'react-bootstrap';
import ListItem from '../General/ListItem';

const DisplayCinemaList = (props) =>{
    return(
        <div className="list-container">
            {
                props.list.map((el)=>
                    <ListItem
                        key={el.cinemaId}
                        displayedParams={[
                            {label: "Name", value: el.name},
                            {label: "City", value: el.city}
                        ]}
                        callBackFromParent={props.handleElementClick}
                        id={el.cinemaId}
                        mode="edit"
                    />
                )
            }
            <div className="button-container"> 
                <Button
                    bsStyle="primary"
                    onClick={props.handleListButtonClick}
                >
                    Create cinema
                </Button>
            </div>
        </div>
    );
}

export default DisplayCinemaList;