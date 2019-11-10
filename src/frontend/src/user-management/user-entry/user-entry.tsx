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
}

function UserEntry(props: Props) {
    const { id } = props;

    const [isEditing, setIsEditing] = useState(false);

    return (
        <TableRow key={id}>
            <TableData width='50px'>{id}</TableData>
            <TableData width='120px'>
                {isEditing ? <TableInput type='text' placeholder='Lorem Ipsum' /> : 'Lorem Ipsum'}
            </TableData>
            <TableData width='120px'>
                {isEditing ? <TableInput type='text' placeholder='0900 000 000' /> : '0900 000 000'}
            </TableData>
            <TableData>
                <TableInput type='checkbox' name='vehicle1' value='Bike' />
            </TableData>
            <TableData>
                <TableInput type='checkbox' name='vehicle1' value='Bike' />
            </TableData>
            <TableData>
                <TableInput type='checkbox' name='vehicle1' value='Bike' />
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
                        <ImageButton>
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
