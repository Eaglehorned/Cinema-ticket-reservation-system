import React from 'react';
import SeatTypePrice from './SeatTypePrice';

const DisplaySeatTypesList = (props) =>{
    return(
        <div className="list-container">
            {
                props.list.map((el)=>
                    <SeatTypePrice
                        key={el.seatTypeId}
                        showHint={props.showHint}
                        seatType={el}
                        callBackChangePrice={props.handleElementChange}
                    />
                )
            }
        </div>
    );
}

export default DisplaySeatTypesList;