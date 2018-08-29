import React from 'react';
import { Button } from 'react-bootstrap';
import DisplayInfoBoxField from './DisplayInfoBoxField';

const ListItem = (props) =>{
    return(
        <div                 
            className={props.mode === 'reserve' ? 'clickable-session-list-box-container font-large' : 'list-box-container font-large'}
            onClick={props.mode === 'reserve' 
            ? () => props.callBackFromParent(props.id)
            : () => {}}    
        >
            <div>
                {
                    props.displayedParams.map((el, index) =>{
                        return <DisplayInfoBoxField
                            key={index}
                            label={el.label}
                            value={el.value}
                        />
                    })
                }
            </div>
            <Button
                onClick={() => props.callBackFromParent(props.id)}
                hidden={props.mode === 'reserve'}
            >
                Edit
            </Button>
        </div>
    );
}

export default ListItem;