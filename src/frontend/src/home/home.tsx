import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Client } from '../client-management/client-management';
import { Procedure } from '../procedures-management/procedures-management';
import { OrderReservation } from './procedure-row/reservation-cell/reservation-cell-create';
import ProcedureRow, { addInterval, Reservation } from './procedure-row/procedure-row';

export const ClientsContext = React.createContext([]);

function fetchProcedures(setProcedures: (procedures: Procedure[]) => void) {
    axios.get(`http://localhost/api/v1/machines-and-procedures?orderBy=id&perPage=-1`).then(res => {
        setProcedures(
            res.data.items.map(object => {
                return {
                    id: object.id,
                    name: object.name,
                    active: object.active,
                    isForMultisportCard: object.is_for_multisport_card,
                };
            })
        );
    });
}

function fetchAllClients(setAllClients: (clients: Client[]) => void) {
    axios
        .get(`http://localhost/api/v1/clients?perPage=-1`)
        .then(res => {
            setAllClients(
                res.data.items.map((object: any) => {
                    return {
                        id: object.id,
                        note: object.note,
                        name: `${object.first_name} ${object.last_name}`,
                        phone: object.phone,
                        isActive: object.active,
                        hasMultisportCard: object.has_multisport_card,
                        isGDPR: object.is_gdpr,
                    };
                })
            );
        })
        .catch(error => {
            console.error(error);
            window.alert('Nastala chyba pri načitávaní klientov');
        });
}

function fetchOrders(startTime: Date, endTime: Date, setOrders: any): void {
    const dateOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    axios
        .get(
            `http://localhost/api/v1/orders?from=${startTime
                .toLocaleString('en-GB', dateOptions)
                .replace(',', '')}&to=${endTime.toLocaleString('en-GB', dateOptions).replace(',', '')}&perPage=-1`
        )
        .then(res => {
            const ordersDict = {};
            res.data.items.forEach((object: any) => {
                if (!(object.order_machine_id in ordersDict)) {
                    ordersDict[object.order_machine_id] = [];
                }

                ordersDict[object.order_machine_id].push({
                    id: object.order_id,
                    note: object.order_note ? object.order_note : '',
                    client: {
                        id: object.id,
                        note: object.note,
                        name: `${object.first_name} ${object.last_name}`,
                        phone: object.phone,
                        isActive: object.active,
                        hasMultisportCard: object.has_multisport_card,
                        isGDPR: object.is_gdpr,
                    } as Client,
                    endTime: new Date(object.order_end_time),
                    startTime: new Date(object.order_start_time),
                    procedure: {
                        id: object.order_machine_id,
                        isActive: object.active,
                        isForMultisportCard: object.is_for_multisport_card,
                    } as Procedure,
                } as Reservation);
            });

            setOrders(ordersDict);
        });
}

function Home() {
    const [procedures, setProcedures] = useState([]);
    const [orders, setOrders] = useState({});
    const [date, setDate] = useState(new Date());
    const [allClients, setAllClients] = useState([]);

    let startTime = new Date(date);
    startTime.setHours(8);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    const endTime = new Date(startTime);
    endTime.setHours(15);

    const reservationTimes: Date[] = [];
    while (startTime <= endTime) {
        reservationTimes.push(startTime);
        startTime = addInterval(startTime);
    }

    function saveReservation(reservation: Reservation) {
        const dateOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };

        const orderObject = {
            client_id: reservation.client.id,
            machine_id: reservation.procedure.id,
            start_time: reservation.startTime.toLocaleString('en-GB', dateOptions).replace(',', ''),
            end_time: reservation.endTime.toLocaleString('en-GB', dateOptions).replace(',', ''),
            note: reservation.note,
        };

        axios
            .post(`http://localhost/api/v1/orders/${reservation.id}`, orderObject)
            .then(res => {
                fetchOrders(reservationTimes[0], endTime, setOrders);
            })
            .catch(error => {
                window.alert('Aktualozácia objednávky zlyhala');
                console.error(error);
            });
    }

    function createReservation(orderReservation: OrderReservation) {
        const dateOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };

        const orderObject = {
            client_id: orderReservation.client_id,
            machine_id: orderReservation.machine_id,
            start_time: orderReservation.start_time.toLocaleString('en-GB', dateOptions).replace(',', ''),
            end_time: orderReservation.end_time.toLocaleString('en-GB', dateOptions).replace(',', ''),
        };

        // TODO if note contains only spaces for some reason the request fails
        if (orderReservation.note !== '') {
            orderObject['note'] = orderReservation.note;
        }

        axios
            .post(`http://localhost/api/v1/orders`, orderObject)
            .then(res => {
                fetchOrders(reservationTimes[0], endTime, setOrders);
            })
            .catch(error => {
                window.alert('Vytváranie objednávky zlyhalo');
                console.error(error);
            });
    }

    function removeReservation(reservation: Reservation) {
        axios
            .delete(`http://localhost/api/v1/orders/${reservation.id}`)
            .then(() => {
                fetchOrders(reservationTimes[0], endTime, setOrders);
            })
            .catch((error: any) => {
                window.alert('Nastala chyba pri vymazávaní rezervácie');
                console.log(error);
            });
    }

    useEffect(() => {
        fetchProcedures(setProcedures);
        fetchOrders(reservationTimes[0], endTime, setOrders);
    }, [date]);

    useEffect(() => {
        fetchAllClients(setAllClients);
    }, []);

    const dateOptions = { hour: '2-digit', minute: '2-digit' };

    return (
        <HomeWrapper>
            <DatePicker todayButton='Dnes' selected={date} onChange={(date: Date) => setDate(date)} />
            <table>
                <tbody>
                    <tr>
                        <th>&nbsp;</th>
                        {reservationTimes.map(time => (
                            <th key={time.toString()}>{time.toLocaleString('en-GB', dateOptions)}</th>
                        ))}
                    </tr>
                    <ClientsContext.Provider value={allClients}>
                        {procedures.map((procedure: Procedure) => {
                            return (
                                <ProcedureRow
                                    date={date}
                                    procedure={procedure}
                                    reservations={orders.hasOwnProperty(procedure.id) ? orders[procedure.id] : []}
                                    saveReservation={saveReservation}
                                    removeReservation={removeReservation}
                                    createReservation={createReservation}
                                    key={procedure.id}
                                />
                            );
                        })}
                    </ClientsContext.Provider>
                </tbody>
            </table>
        </HomeWrapper>
    );
}

const HomeWrapper = styled.div`
    margin: 20px;

    display: flex;
    align-items: center;
    flex-flow: column;
`;

export default Home;
