import React, { useState } from 'react';
import styled from 'styled-components';

import AddCircle from 'images/add_circle.svg';
import { Reservation } from 'home/procedure-row/procedure-row';

import ReservationCellFilled from './reservation-cell-filled';
import ReservationCellEdit from './reservation-cell-edit';

export interface Props {
    reservation: Reservation;
    saveReservation: (reservation: Reservation) => void;
}

enum CellState {
    Filled = 1,
    Editing = 2,
    Empty = 3,
}

function ReservationCell(props: Props) {
    const { reservation, saveReservation } = props;
    const [cellState, setCellState] = useState(reservation.id ? CellState.Filled : CellState.Empty);

    if (cellState === CellState.Editing) {
        return (
            <ReservationCellEdit
                reservation={reservation}
                saveReservation={(reservation: Reservation) => {
                    saveReservation(reservation);
                    setCellState(CellState.Filled);
                }}
                cancelEdit={() => setCellState(reservation ? CellState.Filled : CellState.Empty)}
            />
        );
    } else if (cellState === CellState.Filled) {
        return (
            <ReservationCellFilled
                reservation={reservation}
                deleteReservation={() => console.log('delete')}
                editReservation={() => setCellState(CellState.Editing)}
            />
        );
    } else {
        return (
            <CellWrapper>
                <img onClick={() => setCellState(2)} src={AddCircle} />
            </CellWrapper>
        );
    }
}

export const CellWrapper = styled.div`
    width: 200px;
    height: 150px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export default ReservationCell;
