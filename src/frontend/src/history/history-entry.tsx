import React, { useState } from 'react';
import styled from 'styled-components';

import { TableRow, ClientHistory } from './history-clients';

export interface Props {
    clientHistory: ClientHistory;
}

function ClientEntry(props: Props) {
    const [ClientHistory] = useState({ ...props.clientHistory });

    return (
        <React.Fragment>
            <TableRow key={ClientHistory.id}>
                <TableData width='50px'>{ClientHistory.id}</TableData>
                <TableData width='50px'>{ClientHistory.name}</TableData>
                <TableData width='50px'>{ClientHistory.start}</TableData>
                <TableData width='50px'>{ClientHistory.end}</TableData>
            </TableRow>
        </React.Fragment>
    );
}

const TableData = styled.td<{ width?: string; align?: string; hideOnMobile?: boolean }>`
    width: ${props => (props.width ? props.width : 'auto')};
    max-width: ${props => (props.width ? props.width : 'unset')};
    padding: 10px;

    text-align: ${props => (props.align ? props.align : 'center')};

    @media (max-width: 100rem) {
        display: ${props => (props.hideOnMobile ? 'none' : 'table-cell')};
    }
`;

export default ClientEntry;