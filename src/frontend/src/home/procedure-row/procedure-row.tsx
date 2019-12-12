import React from 'react';
import styled from 'styled-components';

import { Client } from 'user-management/user-management';
import { Procedure } from 'procedures-management/procedures-management';

import ReservationCell from './reservation-cell/reservation-cell';

export interface Reservation {
    id?: number;
    note: string;
    client: Client;
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

function ProcedureRow(props: Props) {
    let startTime = new Date();
    startTime.setHours(8);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    const endTime = new Date(startTime);
    endTime.setHours(15);

    const reservationCells = [];
    while (startTime <= endTime) {
        // Parse json data and figure out for each interval if it has a reservation
        const client = {
            id: reservationCells.length,
            name: 'User Name',
        } as Client;

        const reservation = {
            id: reservationCells.length,
            note: 'this is a note',
            client,
            startTime,
            endTime: addInterval(startTime),
        } as Reservation;

        reservationCells.push(<ReservationCell saveReservation={saveReservation} reservation={reservation} />);
        startTime = addInterval(startTime);
    }

    return (
        <ProcedureRowWrapper>
            <p>{props.procedure.name}</p>
            {reservationCells.map(reservationCell => reservationCell)}
        </ProcedureRowWrapper>
    );
}

const ProcedureRowWrapper = styled.div`
    display: flex;
`;

export default ProcedureRow;
