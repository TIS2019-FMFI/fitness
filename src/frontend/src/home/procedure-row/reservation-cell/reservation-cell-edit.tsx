import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <h2>Vytváranie objednávky</h2>
            <h3>{`${reservation.startTime.toLocaleString('en-GB', dateOptions)} - ${reservation.endTime.toLocaleString(
                'en-GB',
                dateOptions
            )}`}</h3>
            <h3>{reservation.procedure.name}</h3>
            <form>
                <div>
                    <span>Meno</span>
                    <Select
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
                <div>
                    <label htmlFor='note'>Poznámka</label>
                    <input type='text' value={note} onChange={event => setNote(event.target.value)} />
                </div>
                <button
                    type='button'
                    disabled={!canUpdate}
                    onClick={event => {
                        event.preventDefault();
                        handleSubmit();
                    }}
                >
                    Uložiť
                    <FontAwesomeIcon icon='save' />
                </button>
                <button type='reset' onClick={cancelEdit}>
                    Zrušiť
                    <FontAwesomeIcon icon='window-close' />
                </button>
            </form>
        </div>
    );
}

export default ReservationCellEdit;
