import React from 'react';
import styled from 'styled-components';

import { Client } from 'client-management/client-management';
import { Procedure } from 'procedures-management/procedures-management';
import { OrderReservation } from './reservation-cell/reservation-cell-create';
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
    reservations: Reservation[];
    removeReservation: (reservation: Reservation) => void;
    saveReservation: (reservation: Reservation) => void;
    createReservation: (orderReservation: OrderReservation) => void;
    date: Date;
}

export function addInterval(startTime: Date): Date {
    return new Date(startTime.getTime() + 45 * 60000);
}

function getCellReservations(date: Date, procedure: Procedure, reservations: Reservation[]): Reservation[] {
    let startTime = new Date(date);
    startTime.setHours(8);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    startTime.setMilliseconds(0);
    const endTime = new Date(startTime);
    endTime.setHours(15);

    const cellReservations: Reservation[] = [];
    while (startTime <= endTime) {
        const filledReservation = reservations.filter(
            reservation => reservation.startTime.getTime() === startTime.getTime()
        );

        if (filledReservation.length === 0) {
            cellReservations.push({
                endTime: addInterval(startTime),
                startTime,
                procedure,
            } as Reservation);
        } else {
            const reservation = filledReservation[0];
            reservation.procedure = procedure;
            cellReservations.push(reservation);
        }
        startTime = addInterval(startTime);
    }

    return cellReservations;
}

function ProcedureRow(props: Props) {
    const reservationCells = getCellReservations(props.date, props.procedure, props.reservations);

    return (
        <ProcedureRowWrapper>
            <td style={{ width: '50px' }}>
                <p>{props.procedure.name}</p>
            </td>
            {reservationCells.map(reservation => (
                <ReservationCell
                    key={reservation.startTime.toString() + reservation.id}
                    reservation={reservation}
                    saveReservation={props.saveReservation}
                    removeReservation={props.removeReservation}
                    createReservation={props.createReservation}
                />
            ))}
        </ProcedureRowWrapper>
    );
}

const ProcedureRowWrapper = styled.tr``;

export default ProcedureRow;
