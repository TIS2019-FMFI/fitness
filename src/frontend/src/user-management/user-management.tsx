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
    const [maxPage, setMaxPage] = useState(999);
    const match = location.search.match(/page=([0-9]+)/);
    const matchedNumber = (match && match.length > 1 && Number(match[1])) || null;
    const [page, setPage] = useState(matchedNumber > 0 && matchedNumber <= maxPage ? matchedNumber : 1);
    const [users, setUsers] = useState([]);

    if (match === null || matchedNumber !== page) {
        history.push(`/klienty?page=${page}`);
    }

    useEffect(() => {
        fetchUsers(page);
    }, []);

    async function fetchUsers(page: number) {
        axios
            .get(`http://localhost/api/v1/clients?orderBy=id&page=${page}&perPage=${PER_PAGE}`)
            .then(res => {
                setUsers(
                    res.data.items.map((object: any) => {
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
                setMaxPage(res.data.lastPage);
            })
            .catch((error: any) => {
                window.alert('Error v nacitavany zakaznikov');
                console.log(error);
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
            .then(() => {
                fetchUsers(page);
            });
    }

    async function deleteUser(user: User) {
        axios
            .delete(`http://localhost/api/v1/clients/${user.id}`)
            .then(() => {
                fetchUsers(page);
            })
            .catch((error: any) => {
                window.alert('Error pri mazany zakaznika');
                console.log(error);
            });
    }

    function changePage(newPage: number) {
        setPage(newPage);
        history.push(`/klienty?page=${page}`);
        fetchUsers(newPage);
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
                        changePage(page - 1);
                    }}
                >
                    <img src={leftArrowImage} alt={'back arrow'} />
                </PagingButton>
                {page > 1 ? (
                    <PagingButton onClick={() => changePage(1)}>
                        <span>{1}</span>
                    </PagingButton>
                ) : null}
                <PagingButton selected={true}>
                    <span>{page}</span>
                </PagingButton>
                {page !== maxPage ? (
                    <PagingButton onClick={() => changePage(maxPage)}>
                        <span>{maxPage}</span>
                    </PagingButton>
                ) : null}
                <PagingButton
                    disabled={page >= maxPage}
                    onClick={() => {
                        changePage(page + 1);
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
