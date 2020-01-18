import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HistoryEntry from './history-entry';

export interface ClientHistory {
    id: number;
    name: string;
    start: string;
    end: string;
}

const PER_PAGE = 10;

function ClientHistory2() {
    const location = useLocation();
    const history = useHistory();
    const [maxPage, setMaxPage] = useState(999);
    const match = location.search.match(/page=([0-9]+)/);
    const matchedNumber = (match && match.length > 1 && Number(match[1])) || null;
    const [page, setPage] = useState(matchedNumber > 0 && matchedNumber <= maxPage ? matchedNumber : 1);
    const [clientHistory, setClientHistory] = useState([]);
    const [site] = useState('machines');

    if (match === null || matchedNumber !== page) {
        history.push(`/historia/machines?page=${page}`);
    }

    useEffect(() => {
        fetchClientHistory(page);
    }, [page]);

    async function fetchClientHistory(page: number) {
        axios
            .get(`http://localhost/api/v1/machines-and-procedures/history?orderBy=id&page=${page}&perPage=${PER_PAGE}`)
            .then(res => {
                setClientHistory(
                    res.data.items.map((object: any) => {
                        return {
                            id: object.id,
                            name: object.name,
                            start: object.start_time,
                            end: object.end_time,
                        };
                    })
                );
                setMaxPage(res.data.lastPage);
            })
            .catch((error: any) => {
                window.alert('Error v nacitavani historie');
                console.log(error);
            });
    }

    function changePage(newPage: number) {
        setPage(newPage);
        history.push(`/historia/machines?page=${page}`);
        fetchClientHistory(newPage);
    }

    return (
        <Wrapper>
            <StyledLink to='/historia/clients' isActive={'people' === site}>
                Ludia
            </StyledLink>
            <StyledLink to='/historia/machines' isActive={'machines' === site}>
                Stroje
            </StyledLink>
            <Header>
                <Icon icon='bars' color='#0063ff' />
                <HeaderText>Historia objednavok</HeaderText>
            </Header>
            <Table>
                <tbody>
                    <TableRow>
                        <TableDataHeader>ID</TableDataHeader>
                        <TableDataHeader>Nazov</TableDataHeader>
                        <TableDataHeader>Zaciatok</TableDataHeader>
                        <TableDataHeader>Koniec</TableDataHeader>
                    </TableRow>
                    {clientHistory.map(ClientHistory => (
                        <HistoryEntry key={ClientHistory.id} clientHistory={ClientHistory} />
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
                    <img alt={'back arrow'} />
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
                    <img alt={'forward arrow'} />
                </PagingButton>
            </PagingDiv>
        </Wrapper>
    );
}

const StyledLink = styled(Link)<{ isActive: boolean }>`
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    text-decoration: none;

    color: ${props => (props.isActive ? '#f4f5f9' : '#0063ff')};
    background-color: ${props => (props.isActive ? '#0063ff' : 'white')};
`;

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

const Icon = styled(FontAwesomeIcon)<{ color: string }>`
    padding: 0 10px;
    color = ${props => props.color}
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
    padding: 10px;
    padding-left: 25px;
    padding-right: 25px;

    @media (max-width: 1020px) {
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

export default ClientHistory2;
