import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TableRow, Client } from '../client-management';
import Checkbox from './checkbox';

export interface Props {
    client: Client;
    updateClient: (client: Client) => void;
    deleteClient: (client: Client) => void;
}

function ClientEntry(props: Props) {
    const { updateClient, deleteClient } = props;
    const [client, setClient] = useState({ ...props.client });
    const [isEditing, setIsEditing] = useState(false);
    const [noteIsOpen, setNoteIsOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow key={client.id}>
                <TableData width='50px' hideOnMobile={true}>
                    {client.id}
                </TableData>
                <TableData width='180px' align='left'>
                    {isEditing ? (
                        <TableInput
                            onChange={event => {
                                client.name = event.target.value;
                                setClient({ ...client });
                            }}
                            type='text'
                            value={client.name}
                            placeholder={client.name}
                        />
                    ) : (
                        <span>{client.name}</span>
                    )}
                </TableData>
                <TableData width='150px' align='left'>
                    {isEditing ? (
                        <TableInput
                            onChange={event => {
                                client.phone = event.target.value;
                                setClient({ ...client });
                            }}
                            value={client.phone}
                            type='text'
                            placeholder={client.phone}
                        />
                    ) : (
                        <span>{client.phone}</span>
                    )}
                </TableData>
                <TableData hideOnMobile={true}>
                    <Checkbox
                        disabled={!isEditing}
                        checked={client.isActive}
                        onClick={() => {
                            client.isActive = !client.isActive;
                            setClient({ ...client });
                        }}
                    />
                </TableData>
                <TableData hideOnMobile={true}>
                    <Checkbox
                        disabled={!isEditing}
                        checked={client.hasMultisportCard}
                        onClick={() => {
                            client.hasMultisportCard = !client.hasMultisportCard;
                            setClient({ ...client });
                        }}
                    />
                </TableData>
                <TableData hideOnMobile={true}>
                    <Checkbox
                        disabled={!isEditing}
                        checked={client.isGDPR}
                        onClick={() => {
                            client.isGDPR = !client.isGDPR;
                            setClient({ ...client });
                        }}
                    />
                </TableData>
                <TableData width='200px' hideOnMobile={true} onClick={() => setNoteIsOpen(true)}>
                    <ClientNote>{client.note}</ClientNote>
                </TableData>
                <TableData hideOnMobile={true}>
                    {isEditing ? (
                        <ImageButton
                            onClick={() => {
                                setIsEditing(false);
                                updateClient(client);
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
                                setClient({ ...props.client });
                            }}
                        >
                            <Icon size='lg' icon='window-close' color={'#d32f2f'} />
                        </ImageButton>
                    ) : (
                        <ImageButton
                            onClick={() => {
                                if (window.confirm(`Chcete vymazat klienta ${client.name}`)) {
                                    deleteClient(client);
                                }
                            }}
                        >
                            <Icon size='lg' icon='trash' color={'#d32f2f'} />
                        </ImageButton>
                    )}
                </TableData>
            </TableRow>
            <Modal
                isOpen={noteIsOpen}
                onRequestClose={() => setNoteIsOpen(false)}
                style={ModalStyles}
                contentLabel='Example Modal'
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h2 style={{ margin: 0 }}>Poznamka</h2>
                    <FontAwesomeIcon icon='window-close' onClick={() => setNoteIsOpen(false)} />
                </div>
                {isEditing ? (
                    <textarea
                        style={{ width: '100%' }}
                        value={client.note}
                        onChange={event => {
                            client.note = event.target.value;
                            setClient({ ...client });
                        }}
                    ></textarea>
                ) : (
                    <span>{client.note}</span>
                )}
            </Modal>
        </React.Fragment>
    );
}

const ModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        minWidth: '400px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

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

const ClientNote = styled.p`
    margin: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ImageButton = styled.button`
    border: none;
    background: unset;
`;

const Icon = styled(FontAwesomeIcon)<{ color: string }>`
    color: ${props => props.color};
`;

export default ClientEntry;
