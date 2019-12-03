import React, { useState } from 'react';
import styled from 'styled-components';

import saveIcon from 'images/save.svg';
import cancelIcon from 'images/cancel.svg';
import { Reservation } from 'home/procedure-row/procedure-row';

import { CellBody, ButtonsDiv } from './reservation-cell-filled';
import { CellWrapper } from './reservation-cell';

export interface Props {
    reservation?: Reservation;
    saveReservation: (reservation: Reservation) => void;
    cancelEdit: () => void;
}

function getClientId(clientName: string): number | null {
    return 1;
}

function ReservationCellEdit(props: Props) {
    const { reservation, saveReservation, cancelEdit } = props;
    const [clientName, setClientName] = useState(reservation ? reservation.client.name : '');
    const [note, setNote] = useState(reservation && reservation.note ? reservation.note : '');

    return (
        <CellWrapper>
            <CellBody>
                <ClientNameEdit type='text' value={clientName} onChange={event => setClientName(event.target.value)} />
                <NoteEdit value={note} onChange={event => setNote(event.target.value)} />
                <ButtonsDiv>
                    <img
                        onClick={() => {
                            const clientId = getClientId(clientName);
                            if (clientId) {
                                saveReservation(reservation);
                            } else {
                                window.alert('Zle zadane meno zakaznika');
                            }
                        }}
                        src={saveIcon}
                    />
                    <img onClick={cancelEdit} src={cancelIcon} />
                </ButtonsDiv>
            </CellBody>
        </CellWrapper>
    );
}

const ClientNameEdit = styled.input``;

const NoteEdit = styled.textarea``;

export default ReservationCellEdit;
