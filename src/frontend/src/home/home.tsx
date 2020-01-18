import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { Client } from '../client-management/client-management';
import { Procedure } from '../procedures-management/procedures-management';
import { OrderReservation } from './procedure-row/reservation-cell/reservation-cell-create';
import ProcedureRow, { addInterval, Reservation } from './procedure-row/procedure-row';
import { startHour, endHour } from './clock';
import { TokenContext, url } from '../App';


export const ClientsContext = React.createContext([]);

export interface Props {
    isPublic: boolean;
    handleError: (error) => void;
}

function Home(props: Props) {
    const [procedures, setProcedures] = useState([]);
    const [orders, setOrders] = useState({});
    const [date, setDate] = useState(new Date());
    const [allClients, setAllClients] = useState([]);
    const token = useContext(TokenContext);
    const { isPublic, handleError } = props;

    let startTime = new Date(date);
    startTime.setHours(startHour);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    const endTime = new Date(startTime);
    endTime.setHours(endHour);

    const reservationTimes: Date[] = [];
    while (startTime <= endTime) {
        reservationTimes.push(startTime);
        startTime = addInterval(startTime);
    }
    
    function fetchProcedures() {
        axios.get(`${url}/api/v1/machines-and-procedures${isPublic ? '-public' : ''}?orderBy=id&perPage=-1`, { headers: { 'Authorization': 'Bearer ' + token }}).then(res => {
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
        }).catch(error => {
            handleError(error)
        });
    }
    
    function fetchOrders(startTime: Date, endTime: Date): void {
        const dateOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };

        axios
            .get(
                `${url}/api/v1/orders${ isPublic ? '-time-public' : '' }?from=${startTime
                    .toLocaleString('en-GB', dateOptions)
                    .replace(',', '')}&to=${endTime.toLocaleString('en-GB', dateOptions).replace(',', '')}&perPage=-1`,
                { headers: { 'Authorization': 'Bearer ' + token }}
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
            }).catch(error => {
                handleError(error)
                console.error(error)
            });
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
            .post(`${url}/api/v1/orders/${reservation.id}`, orderObject, { headers: { 'Authorization': 'Bearer ' + token }})
            .then(res => {
                fetchOrders(reservationTimes[0], endTime);
            })
            .catch(error => {
                handleError(error)
                window.alert('Order failed');
                console.error(error);
            });
    }
    
    function fetchAllClients() {
        axios
            .get(`${url}/api/v1/clients?&perPage=-1`, { headers: { 'Authorization': 'Bearer ' + token }})
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
                handleError(error);
                console.error(error);
                window.alert('Nastala chyba pri načitávaní klientov');
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
            .post(`${url}/api/v1/orders`, orderObject, { headers: { 'Authorization': 'Bearer ' + token }})
            .then(res => {
                fetchOrders(reservationTimes[0], endTime);
            })
            .catch(error => {
                handleError(error);
                window.alert('Nastala chyba pri vytváraní rezervácie');
                console.error(error);
            });
    }

    function removeReservation(reservation: Reservation) {
        axios
            .delete(`${url}/api/v1/orders/${reservation.id}`, { headers: { 'Authorization': 'Bearer ' + token }})
            .then(() => {
                fetchOrders(reservationTimes[0], endTime);
            })
            .catch((error: any) => {
                handleError(error)
                window.alert('Nastala chyba pri vymazávaní rezervácie');
                console.log(error);
            });
    }

    useEffect(() => {
        fetchProcedures();
        fetchOrders(reservationTimes[0], endTime);
    }, [date]);

    useEffect(() => {
        if (!props.isPublic) {
            fetchAllClients();
        }
    }, []);

    const dateOptions = { hour: '2-digit', minute: '2-digit' };

    const DatePickerInput = ({ value, onClick }) => (
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <div onClick={() => {
                    const newDate = new Date(date);
                    newDate.setHours(date.getHours() - 24);
                    setDate(newDate)
                }}
            >
                <FontAwesomeIcon size='1x' icon='chevron-left' color='#0063ff' />
            </div>
            <div onClick={onClick}>
                <span style={{ fontSize: '24px', margin: '4px', color: '#999' }}>
                    {value}
                </span>
            </div>
            <div onClick={() => {
                    const newDate = new Date(date);
                    newDate.setHours(date.getHours() + 24);
                    setDate(newDate)
                }}
            >
                <FontAwesomeIcon size='1x' icon='chevron-right' color='#0063ff' />
            </div>
        </div>
    );

    return (
        <HomeWrapper>
            <div style={{ alignSelf: 'start', marginLeft: '20px' }}>
                <DatePicker
                    dateFormat="dd MMMM yyyy"
                    locale="sk-SK"
                    customInput={<DatePickerInput value={date} onClick={() => {}} />}
                    todayButton='Dnes'
                    selected={date}
                    onChange={(date: Date) => setDate(date)}
                />
            </div>
            <Table>
                <tbody>
                    <tr>
                        <th>&nbsp;</th>
                        {reservationTimes.map(time => (
                            <TableHead style={{ textAlign: 'center', padding: '10px 0' }} key={time.toString()}>
                                {time.toLocaleString('en-GB', dateOptions)}
                            </TableHead>
                        ))}
                    </tr>
                    <ClientsContext.Provider value={allClients}>
                        {procedures.map((procedure: Procedure) => {
                            return (
                                <ProcedureRow
                                    date={date}
                                    key={procedure.id}
                                    procedure={procedure}
                                    isPublic={props.isPublic}
                                    saveReservation={saveReservation}
                                    removeReservation={removeReservation}
                                    createReservation={createReservation}
                                    reservations={orders.hasOwnProperty(procedure.id) ? orders[procedure.id] : []}
                                />
                            );
                        })}
                    </ClientsContext.Provider>
                </tbody>
            </Table>
        </HomeWrapper>
    );
}

const HomeWrapper = styled.div`
    width: max-content;
    
    padding-top: 10px;
    margin: 20px;
    

    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-flow: column;

    background-color: white;
`;

const Icon = styled(FontAwesomeIcon)`

`

const Table = styled.table`
    margin-top: 10px;

    border-collapse: collapse;
    border-top: 1px #999999 dashed;
`;

const TableHead = styled.th`
    border-left: 1px #999999 dashed;
    font-weight: 400;
    color: #999999;
`;



export default Home;
