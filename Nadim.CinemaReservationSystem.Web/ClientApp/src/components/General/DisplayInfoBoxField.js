import React from 'react';

const DisplayInfoBoxField = (props) =>{
    return(
        <div
            className={props.displayThis === undefined || props.displayThis ? 'list-box-inline-item' : 'hidden'}
        >
            <span className="font-bold">{props.label} :</span> {props.value}
        </div>
    );
}

export default DisplayInfoBoxField;