import React, { useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { Formik, Field, Form } from 'formik';

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
    const [clients, setClients] = useState(Array());

    const validateName = debounce(async (value: string) => {
        const clients = await axios.get(`http://localhost/api/v1/clients/findClient/${value}`);
        if (clients.data.length === 0) {
            return 'No client found';
        }

        setClients(clients.data);
    }, 1000);

    return (
        <div>
            <h2>Vytvor objednavku</h2>
            <h3>{`${startTime.toLocaleString('en-GB', dateOptions)} - ${endTime.toLocaleString(
                'en-GB',
                dateOptions
            )}`}</h3>
            <h3>{procedure.name}</h3>
            <Formik
                initialValues={{ clientName: '', note: '' }}
                onSubmit={values => {
                    if (clients.length !== 1) {
                        return;
                    }

                    const newReservation = {
                        note: values.note,
                        client_id: clients[0].id,
                        machine_id: procedure.id,
                        start_time: startTime,
                        end_time: endTime,
                    } as OrderReservation;

                    createReservation(newReservation);
                }}
            >
                {() => {
                    return (
                        <Form translate=''>
                            <div>
                                <label htmlFor='clientName'>Meno klienta</label>
                                <Field name='clientName' input='text' validate={validateName} />
                            </div>
                            <div>
                                <label htmlFor='note'>Poznamka</label>
                                <Field name='note'>
                                    {({ field }) => (
                                        <input
                                            type='text'
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                </Field>
                            </div>
                            <button type='submit'>Vytvor</button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default ReservationCellCreate;
