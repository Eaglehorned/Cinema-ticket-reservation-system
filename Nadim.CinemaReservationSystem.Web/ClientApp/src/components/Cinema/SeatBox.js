import React from 'react';

const SeatBox = (props) =>{
    
    const getSeatBoxClass = (seatInfo) =>{
        if(seatInfo.chosen){
            return `${seatInfo.type}-chosen`;
        }
        else if(seatInfo.booked){
            return 'booked';
        }
        else{
            return seatInfo.type;
        }
    }

    return(
        <div 
            className={`seat-${getSeatBoxClass(props.seatInfo)}`}
            onClick={() => props.callBackFromParent(props.seatInfo)}
        />
    );
}

export default SeatBox;