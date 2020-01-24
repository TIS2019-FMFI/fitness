import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PublicReservation } from '../procedure-row';
import { CellWrapper } from './reservation-cell';

export interface Props {
    reservation: PublicReservation;
}

function ReservationCellPublic(props: Props) {
    const { reservation } = props;
    const cell = reservation.id ? <Icon icon='user' size='5x'/> : <span />;

    return <CellWrapper>{cell}</CellWrapper>;
}

const Icon = styled(FontAwesomeIcon)`
    color: #ff0063;
`;

export default ReservationCellPublic;
