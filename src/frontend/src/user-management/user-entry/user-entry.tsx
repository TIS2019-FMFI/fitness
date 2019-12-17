import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import editIcon from 'images/edit.svg';
import deleteIcon from 'images/delete.svg';
import saveIcon from 'images/save.svg';
import cancleIcon from 'images/cancel.svg';
import ToolTip from 'ui/tool-tip/tool-tip';

import { TableRow, User } from '../user-management';

export interface Props {
    user: User;
    updateUser: (user: User) => void;
    deleteUser: (user: User) => void;
}

function UserEntry(props: Props) {
    const { updateUser, deleteUser } = props;
    const [user, setUser] = useState({ ...props.user });
    const [isEditing, setIsEditing] = useState(false);
    const [noteIsOpen, setNoteIsOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow key={user.id}>
                <TableData width='50px' hideOnMobile={true}>
                    {user.id}
                </TableData>
                <TableData width='180px' align='left'>
                    {isEditing ? (
                        <TableInput
                            onChange={event => {
                                user.name = event.target.value;
                                setUser({ ...user });
                            }}
                            type='text'
                            value={user.name}
                            placeholder={user.name}
                        />
                    ) : (
                        <span>{user.name}</span>
                    )}
                </TableData>
                <TableData width='150px' align='left'>
                    {isEditing ? (
                        <TableInput
                            onChange={event => {
                                user.phone = event.target.value;
                                setUser({ ...user });
                            }}
                            value={user.phone}
                            type='text'
                            placeholder={user.phone}
                        />
                    ) : (
                        <span>{user.phone}</span>
                    )}
                </TableData>
                <TableData hideOnMobile={true}>
                    <TableInput
                        type='checkbox'
                        name='isActive'
                        onChange={() => {
                            user.isActive = !user.isActive;
                            setUser({ ...user });
                        }}
                        disabled={!isEditing}
                        checked={user.isActive}
                    />
                </TableData>
                <TableData hideOnMobile={true}>
                    <TableInput
                        type='checkbox'
                        onChange={() => {
                            user.hasMultisportCard = !user.hasMultisportCard;
                            setUser({ ...user });
                        }}
                        name='hasMultisportCard'
                        disabled={!isEditing}
                        checked={user.hasMultisportCard}
                    />
                </TableData>
                <TableData hideOnMobile={true}>
                    <TableInput
                        type='checkbox'
                        onClick={() => {
                            user.isGDPR = !user.isGDPR;
                            setUser({ ...user });
                        }}
                        id='isGDPR'
                        name='isGDPR'
                        disabled={!isEditing}
                        checked={user.isGDPR}
                    />
                </TableData>
                <TableData width='200px' hideOnMobile={true} onClick={() => setNoteIsOpen(true)}>
                    <UserNote>{user.note}</UserNote>
                </TableData>
                <TableData hideOnMobile={true}>
                    {isEditing ? (
                        <ToolTip text='Ulozit zmeny'>
                            <ImageButton
                                onClick={() => {
                                    setIsEditing(false);
                                    updateUser(user);
                                }}
                            >
                                <ButtonIcon src={saveIcon} alt='edit' />
                            </ImageButton>
                        </ToolTip>
                    ) : (
                        <ToolTip text='Editovat'>
                            <ImageButton onClick={() => setIsEditing(true)}>
                                <ButtonIcon src={editIcon} alt='edit' />
                            </ImageButton>
                        </ToolTip>
                    )}
                    {isEditing ? (
                        <ToolTip text='Zrusit editovanie'>
                            <ImageButton
                                onClick={() => {
                                    setIsEditing(false);
                                    setUser({ ...props.user });
                                }}
                            >
                                <ButtonIcon src={cancleIcon} alt='edit' />
                            </ImageButton>
                        </ToolTip>
                    ) : (
                        <ToolTip text='Vymazat klienta'>
                            <ImageButton
                                onClick={() => {
                                    if (window.confirm(`Chcete vymazat klienta ${user.name}`)) {
                                        deleteUser(user);
                                    }
                                }}
                            >
                                <ButtonIcon src={deleteIcon} alt='edit' />
                            </ImageButton>
                        </ToolTip>
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
                    <img src={cancleIcon} onClick={() => setNoteIsOpen(false)} />
                </div>
                {isEditing ? (
                    <textarea
                        style={{ width: '100%' }}
                        value={user.note}
                        onChange={event => {
                            user.note = event.target.value;
                            setUser({ ...user });
                        }}
                    ></textarea>
                ) : (
                    <span>{user.note}</span>
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

const UserNote = styled.p`
    margin: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ImageButton = styled.button`
    border: none;
    background: unset;
`;

const ButtonIcon = styled.img`
    color: ${props => (props.color ? props.color : 'black')};
`;

export default UserEntry;
