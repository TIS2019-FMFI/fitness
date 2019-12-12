import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import leftArrow from 'images/left_arrow.svg';
import rightArrow from 'images/right_arrow.svg';
import UserEntry from './user-entry/user-entry';

export interface Client {
    id: number;
    note: string;
    name: string;
}

function UserManagement() {
    const location = useLocation();
    const history = useHistory();
    const maxPage = 13;
    const match = location.search.match(/page=([0-9]+)/);
    const page =
        match && match.length > 1 && Number(match[1]) > 0 && Number(match[1]) <= maxPage ? Number(match[1]) : 1;

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
                        <UserEntry
                            key={v}
                            id={v}
                            name={'test'}
                            phoneNumber={'0900 000 000'}
                            isActive={true}
                            isMultisport={true}
                            isGDPR={false}
                        />
                    ))}
                </tbody>
            </Table>
            <PagingDiv>
                <PagingButton
                    disabled={page < 2}
                    onClick={() => {
                        history.push(`/users?page=${page - 1}`);
                    }}
                >
                    <img src={leftArrow} alt={'back arrow'} />
                </PagingButton>
                {page > 1 ? (
                    <PagingButton>
                        <span onClick={() => history.push(`/users?page=${1}`)}>{1}</span>
                    </PagingButton>
                ) : null}
                <PagingButton selected={true}>
                    <span>{page}</span>
                </PagingButton>
                {page !== maxPage ? (
                    <PagingButton>
                        <span onClick={() => history.push(`/users?page=${maxPage}`)}>{maxPage}</span>
                    </PagingButton>
                ) : null}
                <PagingButton
                    disabled={page >= maxPage}
                    onClick={() => {
                        history.push(`/users?page=${page + 1}`);
                    }}
                >
                    <img src={rightArrow} alt={'forward arrow'} />
                </PagingButton>
            </PagingDiv>
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

const PagingDiv = styled.div`
    display: flex;
`;

const PagingButton = styled.button<{ selected?: boolean }>`
    height: 35px;
    min-width: 35px;
    padding: 0;
    margin: 0;
    border: 1px solid #bdc3c7;
    background: ${props => (props.selected ? '#3498db' : props.disabled ? '#bdc3c7' : 'unset')}

    display: flex;
    justify-content: center;
    align-items: center;
`;

export default UserManagement;
