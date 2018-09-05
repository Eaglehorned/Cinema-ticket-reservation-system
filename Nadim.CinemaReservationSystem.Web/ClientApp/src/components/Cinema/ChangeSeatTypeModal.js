import React from 'react';
import Modal from 'react-modal';
import SeatTypeChange from './SeatTypeChange';

const ChangeSeatTypeModal = (props) =>{
    return(
        <Modal     
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            ariaHideApp={false}
            className="add-cinema-Modal"
        >
            <SeatTypeChange
                seatInfo={props.seatToChangeType}
                callBackSubmitSeatTypeChange={props.submitSeatTypeChange}
                callBackCancelSeatTypeChange={props.closeModal}
            />
        </Modal>
    );
}

export default ChangeSeatTypeModal;