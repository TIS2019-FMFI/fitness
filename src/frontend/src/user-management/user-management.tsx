import React from 'react';
import styled from 'styled-components';

import UserEntry from './user-entry/user-entry';

function UserManagement() {
    return (
        <Wrapper>
            <Header>
                <span>Sprava klientov</span>
            </Header>
            <Table>
                <tbody>
                    <TableRow>
                        <TableDataHeader>ID</TableDataHeader>
                        <TableDataHeader>Meno a priezviso</TableDataHeader>
                        <TableDataHeader>Telefonne cislo</TableDataHeader>
                        <TableDataHeader>Aktivny</TableDataHeader>
                        <TableDataHeader>Multisport</TableDataHeader>
                        <TableDataHeader>GDPR</TableDataHeader>
                        <TableDataHeader></TableDataHeader>
                    </TableRow>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
                        <UserEntry key={v} id={v} />
                    ))}
                </tbody>
            </Table>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;

    border: 1px solid grey;

    background-color: white;
`;

const Header = styled.div`
    height: 50px;
    width: 100%;
    padding: 5px;

    display: flex;
    align-items: center;

    border-bottom: 1px solid grey;
`;

const Table = styled.table`
    margin: 10px;
    margin-left: 40px;

    border-collapse: collapse;
`;

export const TableRow = styled.tr`
    border-bottom: 1px solid grey;
`;

const TableDataHeader = styled.th`
    padding: 16px;
`;

export default UserManagement;
