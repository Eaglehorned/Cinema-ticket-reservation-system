import React from 'react';

const DisplaySeatTypes = (props) =>{
    return(
        <div className="seat-types-info-panel">
            <div className="seat-type-info-block">
                <div className="seat-booked"/>
                <div className="font-large">Booked seat</div>
            </div>
            {props.sessionSeatTypePrices.find(el => el.typeName === 'default')
                ? <React.Fragment>
                        <div className="seat-type-info-block">
                            <div className="seat-default"/>
                            <div className="font-large">Available default seat</div>
                        </div>
                        <div className="seat-type-info-block">
                            <div className="seat-default-chosen"/>
                            <div className="font-large">Chosen default seat</div>
                        </div>
                </React.Fragment>
                : ''
            }
            {props.sessionSeatTypePrices.find(el => el.typeName === 'vip')
                ? <React.Fragment>
                        <div className="seat-type-info-block">
                            <div className="seat-vip"/>
                            <div className="font-large">Available vip seat</div>
                        </div>
                        <div className="seat-type-info-block">
                            <div className="seat-vip-chosen"/>
                            <div className="font-large">Chosen vip seat</div>
                        </div>
                </React.Fragment>
                : ''
            }
        </div>
    );
}

export default DisplaySeatTypes;