import React from 'react';
import ChosenSeatInfoBox from './ChosenSeatInfoBox';

const DisplayChosenSeats = (props) =>{
    return(
        <div className="seat-info-list-container">
            {
                props.chosenSeats.map((el)=>
                    <ChosenSeatInfoBox
                        key={el.sessionSeatId}
                        seatInfo={el}
                        price={props.sessionSeatTypePrices.find((typePrice) => 
                            typePrice.typeName === el.type
                        ).price}
                    />
                )
            }
        </div>
    );
}

export default DisplayChosenSeats;