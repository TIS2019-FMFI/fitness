import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from 'reactstrap';
import styled from 'styled-components';

import { ClientsContext } from 'home/home';
import { Client } from 'client-management/client-management';
import { Procedure } from 'procedures-management/procedures-management';

export interface Props {
    startTime: Date;
    endTime: Date;
    procedure: Procedure;
    createReservation: (orderReservation: OrderReservation) => void;
}

export interface OrderReservation {
    start_time: Date;
    end_time: Date;
    note: string;
    client_id: number;
    machine_id: number;
}

const dateOptions = { hour: '2-digit', minute: '2-digit' };

function ReservationCellCreate(props: Props) {
    const { startTime, endTime, procedure, createReservation } = props;
    const [client, setClient] = useState(null);
    const [note, setNote] = useState('');
    const clients = useContext(ClientsContext);

    const handleSubmit = () => {
        const newReservation = {
            note,
            client_id: client.id,
            machine_id: procedure.id,
            start_time: startTime,
            end_time: endTime,
        } as OrderReservation;

        createReservation(newReservation);
    };

    return (
        <div>
            <h2>Vytváranie objednávky</h2>
            <h3>{`${startTime.toLocaleString('en-GB', dateOptions)} - ${endTime.toLocaleString(
                'en-GB',
                dateOptions
            )}`}</h3>
            <h3>{procedure.name}</h3>
            <div style={{ display: 'flex', flexFlow: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Meno</span>
                    <StyledSelect
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
                <Button
                    type='button'
                    style={{}}
                    color={client === null ? 'secondary' : 'success'}
                    disabled={client === null}
                    onClick={event => {
                        event.preventDefault();
                        handleSubmit();
                    }}
                >
                    Uložiť
                    <Icon icon='save' />
                </Button>
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

const Icon = styled(FontAwesomeIcon)`
    margin-left: 5px;
`;

export default ReservationCellCreate;
