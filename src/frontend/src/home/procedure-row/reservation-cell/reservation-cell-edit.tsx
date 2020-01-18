import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from 'reactstrap';
import styled from 'styled-components';

import { ClientsContext } from 'home/home';
import { Client } from 'client-management/client-management';
import { Reservation } from 'home/procedure-row/procedure-row';

export interface Props {
    reservation: Reservation;
    saveReservation: (reservation: Reservation) => void;
    cancelEdit: () => void;
}

const dateOptions = { hour: '2-digit', minute: '2-digit' };

function ReservationCellEdit(props: Props) {
    const { reservation, saveReservation, cancelEdit } = props;
    const [client, setClient] = useState(reservation.client);
    const [note, setNote] = useState(reservation.note);
    const clients = useContext(ClientsContext);

    const canUpdate = reservation.note !== note || reservation.client.id !== client.id;

    const handleSubmit = () => {
        if (reservation.note !== note) {
            reservation.note = note;
        }

        if (reservation.client.id !== client.id) {
            reservation.client = client;
        }

        saveReservation(reservation);
    };

    return (
        <div>
            <h2>Editácia objednávky</h2>
            <h3>{`${reservation.startTime.toLocaleString('en-GB', dateOptions)} - ${reservation.endTime.toLocaleString(
                'en-GB',
                dateOptions
            )}`}</h3>
            <h3>{reservation.procedure.name}</h3>
            <div style={{ display: 'flex', flexFlow: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Meno</span>
                    <StyledSelect
                        value={{ value: client, label: client.name }}
                        options={clients.map(client => {
                            return {
                                value: client,
                                label: client.name,
                            };
                        })}
                        onChange={(option: { value: Client; label: string }) => setClient(option.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', marginBottom: '10px' }}>
                    <span>Poznámka</span>
                    <StyledInput type='text' value={note} onChange={event => setNote(event.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <StyledButton
                        type='button'
                        color={canUpdate ? 'success' : 'secondary'}
                        disabled={!canUpdate}
                        onClick={event => {
                            event.preventDefault();
                            handleSubmit();
                        }}
                    >
                        Uložiť
                        <Icon icon='save' />
                    </StyledButton>
                    <StyledButton outline type='reset' onClick={cancelEdit}>
                        Zrušiť
                        <Icon icon='window-close' />
                    </StyledButton>
                </div>
            </div>
        </div>
    );
}

const StyledSelect = styled(Select)`
    width: 100%;
    margin-left: 10px;
`;

const StyledInput = styled(Input)`
    margin-left: 10px;
`;

const StyledButton = styled(Button)`
    width: 100%;
    margin: 0 5px;
`;

const Icon = styled(FontAwesomeIcon)`
    margin: 0 5px;
`;

export default ReservationCellEdit;
