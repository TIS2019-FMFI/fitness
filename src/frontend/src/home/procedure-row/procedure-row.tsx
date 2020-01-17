import React from 'react';
import styled from 'styled-components';

import { Client } from 'client-management/client-management';
import { Procedure } from 'procedures-management/procedures-management';
import { OrderReservation } from './reservation-cell/reservation-cell-create';
import ReservationCell from './reservation-cell/reservation-cell';
import ReservationCellPublic from './reservation-cell/reservation-cell-public';
import { startHour, endHour } from '../clock';

export class Reservation {
    id?: number;
    note: string;
    client: Client;
    endTime: Date;
    startTime: Date;
    procedure: Procedure;
}

export class PublicReservation {
    id?: number;
    endTime: Date;
    startTime: Date;
    procedure: Procedure;
}

export interface Props {
    procedure: Procedure;
    reservations: Reservation[] | PublicReservation[];
    removeReservation: (reservation: Reservation) => void;
    saveReservation: (reservation: Reservation) => void;
    createReservation: (orderReservation: OrderReservation) => void;
    isPublic: boolean;
    date: Date;
}

export function addInterval(startTime: Date): Date {
    return new Date(startTime.getTime() + 45 * 60000);
}

function getCellReservations(
    date: Date,
    procedure: Procedure,
    reservations: Reservation[] | PublicReservation[]
): any[] {
    let startTime = new Date(date);
    startTime.setHours(startHour);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    startTime.setMilliseconds(0);
    const endTime = new Date(startTime);
    endTime.setHours(endHour);

    const cellReservations = [];
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
            const reservation = filledReservation[0] as Reservation | PublicReservation;
            reservation.procedure = procedure;
            cellReservations.push(reservation);
        }
        startTime = addInterval(startTime);
    }

    return cellReservations;
}

function ProcedureRow(props: Props) {
    const reservationCells = getCellReservations(props.date, props.procedure, props.reservations as Reservation[]);

    return (
        <ProcedureRowWrapper>
            <TableDataName>
                <p>{props.procedure.name}</p>
            </TableDataName>
            {reservationCells.map(reservation => {
                return props.isPublic ? (
                    <ReservationCellPublic
                        key={reservation.startTime.toString() + reservation.id}
                        reservation={reservation as PublicReservation}
                    />
                ) : (
                    <ReservationCell
                        key={reservation.startTime.toString() + reservation.id}
                        reservation={reservation as Reservation}
                        saveReservation={props.saveReservation}
                        removeReservation={props.removeReservation}
                        createReservation={props.createReservation}
                    />
                );
            })}
        </ProcedureRowWrapper>
    );
}

const ProcedureRowWrapper = styled.tr`
    background-color: #f4f5f9;
`;

const TableDataName = styled.td`
    width: '50px';
    padding: 0 10px;

    border-top: 1px black dashed;
    background-color: white;
`;

export default ProcedureRow;
