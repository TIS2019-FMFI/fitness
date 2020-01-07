import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import AddCircle from 'images/add_circle.svg';
import { Reservation } from 'home/procedure-row/procedure-row';

import ReservationCellFilled from './reservation-cell-filled';
import ReservationCellEdit from './reservation-cell-edit';
import ReservationCellCreate, { OrderReservation } from './reservation-cell-create';

export interface Props {
    reservation: Reservation;
    saveReservation: (reservation: Reservation) => void;
    removeReservation: (reservation: Reservation) => void;
    createReservation: (orderReservation: OrderReservation) => void;
}

enum CellState {
    Filled = 1,
    Empty = 2,
}

function ReservationCell(props: Props) {
    const { reservation, saveReservation, removeReservation, createReservation } = props;
    const cellState = reservation.id ? CellState.Filled : CellState.Empty;
    const [viewModal, setViewModal] = useState(false);

    const returnCell =
        cellState === CellState.Filled ? (
            <ReservationCellFilled
                reservation={reservation}
                deleteReservation={() => removeReservation(reservation)}
                editReservation={() => setViewModal(true)}
            />
        ) : (
            <img onClick={() => setViewModal(true)} src={AddCircle} />
        );

    return (
        <CellWrapper>
            {returnCell}
            <Modal
                isOpen={viewModal}
                ariaHideApp={false}
                onRequestClose={() => setViewModal(false)}
                style={ModalStyles}
            >
                {reservation.id ? (
                    <ReservationCellEdit
                        reservation={reservation}
                        saveReservation={reservation => {
                            setViewModal(false);
                            saveReservation(reservation);
                        }}
                        cancelEdit={() => setViewModal(false)}
                    />
                ) : (
                    <ReservationCellCreate
                        startTime={reservation.startTime}
                        endTime={reservation.endTime}
                        procedure={reservation.procedure}
                        createReservation={reservation => {
                            setViewModal(false);
                            createReservation(reservation);
                        }}
                    />
                )}
            </Modal>
        </CellWrapper>
    );
}

const ModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        minWidth: '400px',
        marginRight: '-50%',
        overflow: 'visible',
        transform: 'translate(-50%, -50%)',
    },
};

export const CellWrapper = styled.td`
    width: 130px;
    height: 80px;

    text-align: center;
`;

export default ReservationCell;
