import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import leftArrow from 'images/left_arrow.svg';
import rightArrow from 'images/right_arrow.svg';
import UserEntry from './user-entry/user-entry';

export interface User {
    id: number;
    note: string;
    name: string;
    phone: string;
    isActive: boolean;
    hasMultisportCard: boolean;
    isGDPR: boolean;
}

const PER_PAGE = 10;

function UserManagement() {
    const location = useLocation();
    const history = useHistory();
    const maxPage = 13;
    const match = location.search.match(/page=([0-9]+)/);
    const page =
        match && match.length > 1 && Number(match[1]) > 0 && Number(match[1]) <= maxPage ? Number(match[1]) : 1;

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        axios
            .get(`http://localhost/api/v1/clients?orderBy=id&page=${page}&perPage=${PER_PAGE}`)
            .then(res => {
                setUsers(
                    res.data.map(object => {
                        return {
                            id: object.id,
                            note: object.note,
                            name: `${object.first_name} ${object.last_name}`,
                            phone: object.phone,
                            isActive: object.active,
                            hasMultisportCard: object.has_multisport_card,
                            isGDPR: object.is_gdpr,
                        };
                    })
                );
            })
            .catch(error => {
                window.alert('error fetching user data');
            });
    }

    async function updateUser(user: User) {
        axios
            .post(`http://localhost/api/v1/clients/${user.id}`, {
                first_name: user.name.split(' ')[0],
                last_name: user.name.split(' ')[1],
                phone: user.phone,
                active: user.isActive,
                has_multisport_card: user.hasMultisportCard,
                note: user.note,
                is_gdpr: user.isGDPR,
            })
            .then(res => {
                fetchUsers();
            });
    }

    async function deleteUser(user: User) {
        axios.delete(`http://localhost/api/v1/clients/${user.id}`).then(res => {
            fetchUsers();
        });
    }

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
                    {users.map(user => (
                        <UserEntry key={user.id} user={user} updateUser={updateUser} deleteUser={deleteUser} />
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
