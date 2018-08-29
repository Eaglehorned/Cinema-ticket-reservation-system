import React from 'react';
import { Button } from 'react-bootstrap';
import ListItem from './ListItem';

const DisplayList = (props) =>{
    return(
        <div className="list-container">
            {
                props.list.map((el)=>
                    <ListItem
                        key={el[`${props.listItemIdParameter}`]}
                        displayedParams={props.params.map(param =>{
                            return{
                                label: param.label,
                                value: el[`${param.property}`]
                            }
                        })}
                        callBackFromParent={props.handleElementClick}
                        id={el[`${props.listItemIdParameter}`]}
                        mode="edit"
                    />
                )
            }
            <div className="button-container"> 
                <Button
                    bsStyle="primary"
                    onClick={props.handleListButtonClick}
                >
                    {props.listButtonLabel}
                </Button>
            </div>
        </div>
    );
}

export default DisplayList;