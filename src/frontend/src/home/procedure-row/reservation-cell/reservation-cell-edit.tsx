import React, { useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

import saveIcon from 'images/save.svg';
import cancelIcon from 'images/cancel.svg';
import { Reservation } from 'home/procedure-row/procedure-row';

export interface Props {
    reservation: Reservation;
    saveReservation: (reservation: Reservation) => void;
    cancelEdit: () => void;
}

const dateOptions = { hour: '2-digit', minute: '2-digit' };

function ReservationCellEdit(props: Props) {
    const { reservation, saveReservation, cancelEdit } = props;
    const [clients, setClients] = useState([reservation.client]);
    const [name, setName] = useState(reservation.client.name);
    const [note, setNote] = useState(reservation.note);

    const validateName = debounce(async (value: string) => {
        const clients = await axios.get(`http://localhost/api/v1/clients/findClient/${value}`);
        if (clients.data.length === 0) {
            return 'No client found';
        }

        setClients(clients.data);
    }, 1000);

    const handleSubmit = () => {
        if (clients.length !== 1) {
            return;
        }

        let shouldUpdate = false;

        if (reservation.note !== note) {
            shouldUpdate = true;
            reservation.note = note;
        }

        if (reservation.client.name !== name) {
            shouldUpdate = true;
            const newClient = clients[0];
            reservation.client.id = newClient.id;
            reservation.client.name = newClient.name;
        }

        if (shouldUpdate) {
            saveReservation(reservation);
        }
    };

    return (
        <div>
            <h2>Vytvor objednavku</h2>
            <h3>{`${reservation.startTime.toLocaleString('en-GB', dateOptions)} - ${reservation.endTime.toLocaleString(
                'en-GB',
                dateOptions
            )}`}</h3>
            <h3>{reservation.procedure.name}</h3>
            <form>
                <div>
                    <label htmlFor='clientName'>Meno klienta</label>
                    <input
                        type='text'
                        value={name}
                        onChange={event => {
                            validateName(event.target.value);
                            setName(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor='note'>Poznamka</label>
                    <input type='text' value={note} onChange={event => setNote(event.target.value)} />
                </div>
                <button
                    type='button'
                    onClick={event => {
                        event.preventDefault();
                        handleSubmit();
                    }}
                >
                    Ulozit
                    <img src={saveIcon} />
                </button>
                <button type='reset' onClick={cancelEdit}>
                    Cancel
                    <img src={cancelIcon} />
                </button>
            </form>
        </div>
    );
}

export default ReservationCellEdit;
