import React, { useState } from 'react';
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

    return (
        <TableRow key={user.id}>
            <TableData width='50px'>{user.id}</TableData>
            <TableData width='120px'>
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
            <TableData width='120px'>
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
            <TableData>
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
            <TableData>
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
            <TableData>
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
            <TableData>
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
    );
}

const TableData = styled.td<{ width?: string }>`
    width: ${props => (props.width ? props.width : 'auto')};
    max-width: ${props => (props.width ? props.width : 'auto')};
    padding: 10px;

    text-align: center;
`;

const TableInput = styled.input`
    width: inherit;
`;

const ImageButton = styled.button`
    border: none;
    background: unset;
`;

const ButtonIcon = styled.img`
    color: ${props => (props.color ? props.color : 'black')};
`;

export default UserEntry;
