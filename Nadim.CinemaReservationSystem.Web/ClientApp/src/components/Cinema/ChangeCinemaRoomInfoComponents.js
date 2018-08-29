import React from 'react';
import { FormGroup } from 'react-bootstrap';
import FormCinemaRoomInfo from './FormCinemaRoomInfo';
import SeatsScheme from './SeatsScheme';
 
const ChangeCinemaRoomInfoComponents = (props) =>{
    return(
        <React.Fragment>
            <FormGroup>
                <legend>
                    Cinema room name
                </legend>
                <FormCinemaRoomInfo
                    callBackHandleChangeCinemaRoomInfo={props.handleChangeCinemaRoomNameInfo}
                    cinemaRoomInfo={props.cinemaRoomInfo}
                    displayedComponents={{name: true}}
                    needToShowHint={true}
                />
            </FormGroup>
            <FormGroup>
            <legend>
                Edit seats scheme name
            </legend>
                <FormCinemaRoomInfo
                    callBackReceiveCinemaRoomInfo={props.createSeatsArray}
                    displayedComponents={{
                        rows: true, 
                        columns: true,
                        submit: true
                    }}
                    cinemaRoomInfo={props.cinemaRoomInfo}
                    needToShowHint={true}
                />
            </FormGroup>
            <FormGroup>
            <legend>
                Change seat types
            </legend>
                <SeatsScheme
                    seatsArray={props.cinemaRoomSeats}
                    callBackFromParent={props.changeSeatType}
                    callBackSubmit={props.submitCinemaRoomSeats}
                    mode="display"
                />
            </FormGroup>
        </React.Fragment>
    );
}

export default ChangeCinemaRoomInfoComponents;