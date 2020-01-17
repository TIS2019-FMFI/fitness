import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TableRow, Procedure } from './procedures-management';
import Checkbox from '../client-management/client-entry/checkbox';

export interface Props {
    procedure: Procedure;
    updateProcedure: (procedure: Procedure) => void;
    deleteProcedure: (procedure: Procedure) => void;
}

function ProcedureEntry(props: Props) {
    const { updateProcedure, deleteProcedure } = props;
    const [procedure, setProcedure] = useState({ ...props.procedure });
    const [isEditing, setIsEditing] = useState(false);

    return (
        <TableRow key={procedure.id}>
            <TableData width='50px'>{procedure.id}</TableData>
            <TableData width='180px' align='left'>
                {isEditing ? (
                    <TableInput
                        onChange={event => {
                            procedure.name = event.target.value;
                            setProcedure({ ...procedure });
                        }}
                        type='text'
                        value={procedure.name}
                        placeholder={procedure.name}
                    />
                ) : (
                    <span>{procedure.name}</span>
                )}
            </TableData>
            <TableData>
                <Checkbox
                    disabled={!isEditing}
                    checked={procedure.isActive}
                    onClick={() => {
                        procedure.isActive = !procedure.isActive;
                        setProcedure({ ...procedure });
                    }}
                />
            </TableData>
            <TableData>
                <Checkbox
                    disabled={!isEditing}
                    checked={procedure.isForMultisportCard}
                    onClick={() => {
                        procedure.isForMultisportCard = !procedure.isForMultisportCard;
                        setProcedure({ ...procedure });
                    }}
                />
            </TableData>
            <TableData>
                {isEditing ? (
                    <ImageButton
                        onClick={() => {
                            setIsEditing(false);
                            updateProcedure(procedure);
                        }}
                    >
                        <Icon size='lg' icon='save' color={'#0063ff'} />
                    </ImageButton>
                ) : (
                    <ImageButton onClick={() => setIsEditing(true)}>
                        <Icon size='lg' icon='edit' color={'#0063ff'} />
                    </ImageButton>
                )}
                {isEditing ? (
                    <ImageButton
                        onClick={() => {
                            setIsEditing(false);
                            setProcedure({ ...props.procedure });
                        }}
                    >
                        <Icon size='lg' icon='window-close' color={'#d32f2f'} />
                    </ImageButton>
                ) : (
                    <ImageButton
                        onClick={() => {
                            if (window.confirm(`Chcete vymazat klienta ${procedure.name}`)) {
                                deleteProcedure(procedure);
                            }
                        }}
                    >
                        <Icon size='lg' icon='trash' color={'#d32f2f'} />
                    </ImageButton>
                )}
            </TableData>
        </TableRow>
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

const TableInput = styled.input`
    width: inherit;
`;

const ImageButton = styled.button`
    border: none;
    background: unset;
`;

const Icon = styled(FontAwesomeIcon)<{ color: string }>`
    color: ${props => props.color};
`;

export default ProcedureEntry;
