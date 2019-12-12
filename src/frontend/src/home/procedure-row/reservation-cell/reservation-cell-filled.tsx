import React from 'react';
import styled from 'styled-components';

import editIcon from 'images/edit.svg';
import deleteIcon from 'images/delete.svg';
import { Reservation } from 'home/procedure-row/procedure-row';

import { CellWrapper } from './reservation-cell';

export interface Props {
    reservation: Reservation;
    deleteReservation: () => void;
    editReservation: () => void;
}

function ReservationCellFilled(props: Props) {
    const { reservation, editReservation, deleteReservation } = props;

    return (
        <CellWrapper>
            <CellBody>
                <ClientName>{reservation.client.name}</ClientName>
                {reservation.note !== '' ? <Note>{reservation.note}</Note> : null}
                <ButtonsDiv>
                    <img onClick={editReservation} src={editIcon} />
                    <img onClick={deleteReservation} src={deleteIcon} />
                </ButtonsDiv>
            </CellBody>
        </CellWrapper>
    );
}

export const CellBody = styled.div`
    height: 100%;
    width: 100%;
    margin: 2px;

    display: flex;
    position: relative;
    flex-flow: column;
    background: white;
    box-shadow: 1px 4px #888888;
`;

export const ClientName = styled.p`
    text-align: center;
    margin: 0;
`;

export const Note = styled.p`
    margin: 0;
`;

export const ButtonsDiv = styled.div`
    position: absolute;
    bottom: 0;
    align-self: flex-end;
`;

export default ReservationCellFilled;