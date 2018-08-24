import React from 'react';

const SessionDisplayInfoBoxField = (props) =>{
    return(
        <div
            className={props.displayThis ? 'list-box-inline-item' : 'hidden'}
        >
            <span className="font-bold">{props.label} :</span> {props.value}
        </div>
    );
}

export default SessionDisplayInfoBoxField;