import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import leftArrowImage from 'images/left_arrow.svg';
import rightArrowImage from 'images/right_arrow.svg';
import linesImage from 'images/reorder.svg';

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
                <img style={{ margin: '5px', paddingTop: '4px' }} src={linesImage} />
                <HeaderText>Sprava klientov</HeaderText>
            </Header>
            <Table>
                <tbody>
                    <TableRow>
                        <TableDataHeader hideOnMobile={true}>ID</TableDataHeader>
                        <TableDataHeader>Meno a priezvisko</TableDataHeader>
                        <TableDataHeader>Telefonne cislo</TableDataHeader>
                        <TableDataHeader hideOnMobile={true}>Aktivny</TableDataHeader>
                        <TableDataHeader hideOnMobile={true}>Multisport</TableDataHeader>
                        <TableDataHeader hideOnMobile={true}>GDPR</TableDataHeader>
                        <TableDataHeader hideOnMobile={true}>Poznamka</TableDataHeader>
                        <TableDataHeader hideOnMobile={true}></TableDataHeader>
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
                    <img src={leftArrowImage} alt={'back arrow'} />
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
                    <img src={rightArrowImage} alt={'forward arrow'} />
                </PagingButton>
            </PagingDiv>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-top: 80px;
    border: 1px solid #e6e6e6;

    background-color: white;
`;

const Header = styled.div`
    height: 50px;
    padding: 5px;

    display: flex;
    align-items: center;

    border-bottom: 1px solid #e6e6e6;
`;

const HeaderText = styled.span`
    color: #0063ff;
`;

const Table = styled.table`
    margin: 20px 0 20px 40px;

    border-top: 1px solid #d5dee3;
    border-collapse: collapse;
`;

export const TableRow = styled.tr`
    border-bottom: 1px solid #d5dee3;
`;

const TableDataHeader = styled.th<{ hideOnMobile?: boolean }>`
    padding: 6px;

    @media (max-width: 100rem) {
        display: ${props => (props.hideOnMobile ? 'none' : 'table-cell')};
    }
`;

const PagingDiv = styled.div`
    display: flex;
`;

const PagingButton = styled.button<{ selected?: boolean }>`
    height: 35px;
    min-width: 35px;
    padding: 0;
    margin: 0;
    border: 1px solid ${props => (props.selected ? '#0063ff' : '#e6e6e6')};

    background: ${props => (props.selected ? '#0063ff' : props.disabled ? '#e6e6e6' : 'unset')}
    color: ${props => (props.selected ? 'white' : '#0063ff')}

    display: flex;
    justify-content: center;
    align-items: center;
`;

export default UserManagement;
