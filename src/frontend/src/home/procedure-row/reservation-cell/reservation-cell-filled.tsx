import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Reservation } from 'home/procedure-row/procedure-row';

export interface Props {
    reservation: Reservation;
    deleteReservation: () => void;
    editReservation: () => void;
}

function ReservationCellFilled(props: Props) {
    const { reservation, editReservation, deleteReservation } = props;

    return (
        <CellBody>
            <ClientName>{reservation.client.name}</ClientName>
            <BottomDiv>
                <ButtonsDiv>
                    <Icon onClick={editReservation} icon='edit' color={'#0063ff'} />
                    <Icon onClick={deleteReservation} icon='trash' color={'#d32f2f'} />
                </ButtonsDiv>
                {reservation.note ? <Icon icon='comment-dots' color={'#0063ff'} /> : null}
            </BottomDiv>
        </CellBody>
    );
}

export const CellBody = styled.div`
    height: 100%;
    width: auto;
    margin: 5px 5px 5px 5px;
    padding: 10px;

    display: flex;
    position: relative;
    flex-flow: column;
    justify-content: space-between;

    border-radius: 5px;
    background: white;
`;

const ClientName = styled.p`
    text-align: center;
    margin: 0;
`;

const BottomDiv = styled.div`
    display: flex;
    flex-flow: row-reverse;
    justify-content: space-between;
`;

const ButtonsDiv = styled.div`
    align-self: flex-end;
`;

const Icon = styled(FontAwesomeIcon)<{ color: string }>`
    margin: 2px;
    color: ${props => props.color};
`;

export default ReservationCellFilled;
