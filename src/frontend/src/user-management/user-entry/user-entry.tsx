import React, { useState } from 'react';
import styled from 'styled-components';

import editIcon from 'images/edit.svg';
import deleteIcon from 'images/delete.svg';
import saveIcon from 'images/save.svg';
import cancleIcon from 'images/cancel.svg';
import ToolTip from 'ui/tool-tip/tool-tip';

import { TableRow } from '../user-management';

export interface Props {
    id: number;
    name: string;
    phoneNumber: string;
    isActive: boolean;
    isMultisport: boolean;
    isGDPR: boolean;
}

function UserEntry(props: Props) {
    const { id, name, phoneNumber, isActive, isMultisport, isGDPR } = props;
    const [user, setUser] = useState({ name, phoneNumber, isActive, isMultisport, isGDPR });
    const [isEditing, setIsEditing] = useState(false);

    return (
        <TableRow key={id}>
            <TableData width='50px'>{id}</TableData>
            <TableData width='120px'>
                {isEditing ? (
                    <TableInput
                        onChange={event => {
                            user.name = event.target.value;
                            setUser({ ...user });
                        }}
                        type='text'
                        value={user.name}
                        placeholder={name}
                    />
                ) : (
                    <span>{user.name}</span>
                )}
            </TableData>
            <TableData width='120px'>
                {isEditing ? (
                    <TableInput
                        onChange={event => {
                            user.phoneNumber = event.target.value;
                            setUser({ ...user });
                        }}
                        value={user.phoneNumber}
                        type='text'
                        placeholder={phoneNumber}
                    />
                ) : (
                    <span>{user.phoneNumber}</span>
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
                        user.isMultisport = !user.isMultisport;
                        setUser({ ...user });
                    }}
                    name='isMultisport'
                    disabled={!isEditing}
                    checked={user.isMultisport}
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
                        <ImageButton onClick={() => setIsEditing(false)}>
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
                        <ImageButton onClick={() => setIsEditing(false)}>
                            <ButtonIcon src={cancleIcon} alt='edit' />
                        </ImageButton>
                    </ToolTip>
                ) : (
                    <ToolTip text='Vymazat klienta'>
                        <ImageButton
                            onClick={() => {
                                if (window.confirm(`Chcete vymazat klienta ${user.name}`)) {
                                    window.alert(`DELETED ${user.name}`);
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
