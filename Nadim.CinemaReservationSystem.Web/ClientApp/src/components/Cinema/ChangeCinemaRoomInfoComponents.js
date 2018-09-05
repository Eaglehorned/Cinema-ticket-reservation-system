import React from 'react';
import { FormGroup } from 'react-bootstrap';
import FormCinemaRoomInfo from './FormCinemaRoomInfo';
import SeatsScheme from './SeatsScheme';
import CreateCinemaRoomSeats from './CreateCinemaRoomSeats';
 
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
                <CreateCinemaRoomSeats
                    callBackReceiveCinemaRoomInfo={props.createSeatsArray}
                    cinemaRoomInfo={props.cinemaRoomInfo}
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