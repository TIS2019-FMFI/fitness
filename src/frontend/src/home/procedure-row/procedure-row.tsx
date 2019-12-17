import React, { useState } from 'react';
import styled from 'styled-components';

import { User } from 'user-management/user-management';
import { Procedure } from 'procedures-management/procedures-management';

import ReservationCell from './reservation-cell/reservation-cell';

export interface Reservation {
    id?: number;
    note: string;
    client: User;
    endTime: Date;
    startTime: Date;
    procedure: Procedure;
}

export interface Props {
    procedure: Procedure;
}

function addInterval(startTime: Date) {
    return new Date(startTime.getTime() + 45 * 60000);
}

function saveReservation(reservation: Reservation) {
    if (reservation.id) {
        console.log(
            `Updating reservation, reservationId = ${
                reservation.id
            } time = ${reservation.startTime.toString()}, clientId = ${reservation.client.id} note = ${
                reservation.note
            }`
        );
    } else {
        console.log(
            `Creating reservation, time = ${reservation.startTime.toString()}, clientId = ${
                reservation.client.id
            } note = ${reservation.note}`
        );
    }
}

function emptyReservations(): Reservation[] {
    let startTime = new Date();
    startTime.setHours(8);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    const endTime = new Date(startTime);
    endTime.setHours(15);

    const emptyReservationCells: Reservation[] = [];
    while (startTime <= endTime) {
        emptyReservationCells.push({
            endTime,
            startTime,
        } as Reservation);
        startTime = addInterval(startTime);
    }

    return emptyReservationCells;
}

function ProcedureRow(props: Props) {
    const [reservationCells, setReservationCells] = useState(emptyReservations);

    return (
        <ProcedureRowWrapper>
            <p>{props.procedure.name}</p>
            {reservationCells.map(reservation => (
                <ReservationCell reservation={reservation} saveReservation={saveReservation} />
            ))}
        </ProcedureRowWrapper>
    );
}

const ProcedureRowWrapper = styled.div`
    display: flex;
`;

export default ProcedureRow;
