import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HistoryEntry from './history-entry';
import { TokenContext, url } from '../App';

export interface ClientHistory {
    id: number;
    name: string;
    date: string;
    start: string;
    end: string;
}

export interface Props {
    handleError: (error) => void;
}

const PER_PAGE = 10;

function ClientHistory2(props: Props) {
    const location = useLocation();
    const history = useHistory();
    const [maxPage, setMaxPage] = useState(999);
    const match = location.search.match(/page=([0-9]+)/);
    const matchedNumber = (match && match.length > 1 && Number(match[1])) || null;
    const [page, setPage] = useState(matchedNumber > 0 && matchedNumber <= maxPage ? matchedNumber : 1);
    const [clientHistory, setClientHistory] = useState([]);
    const [site] = useState('machines');
    const token = useContext(TokenContext);

    if (match === null || matchedNumber !== page) {
        history.push(`/historia/machines?page=${page}`);
    }

    useEffect(() => {
        fetchClientHistory(page);
    }, [page]);

    async function fetchClientHistory(page: number) {
        axios
            .get(`${url}/api/v1/machines-and-procedures/history?orderBy=id&page=${page}&perPage=${PER_PAGE}`, {
                headers: { Authorization: 'Bearer ' + token },
            })
            .then(res => {
                setClientHistory(
                    res.data.items.map((object: any) => {
                        return {
                            id: object.id,
                            name: object.name,
                            date: object.start_time.split(' ')[0],
                            start: object.start_time.split(' ')[1],
                            end: object.end_time.split(' ')[1],
                        };
                    })
                );
                setMaxPage(res.data.lastPage);
            })
            .catch((error: any) => {
                props.handleError(error);
                window.alert('Nastala chyba pri načitávaní histórie.');
                console.log(error);
            });
    }

    function changePage(newPage: number) {
        setPage(newPage);
        history.push(`/historia/machines?page=${page}`);
        fetchClientHistory(newPage);
    }

    return (
        <>
            <div style={{ marginTop: 80 }}>
                <StyledLink to='/historia/clients' isActive={'people' === site}>
                    Ľudia
                </StyledLink>
                <StyledLink to='/historia/machines' isActive={'machines' === site}>
                    Stroje
                </StyledLink>
            </div>

            <Wrapper>
                <Header>
                    <Icon size='3x' icon='bars' color='#0063ff' />
                    <HeaderText>História objednávok</HeaderText>
                </Header>
                <Table>
                    <tbody>
                        <TableRow>
                            <TableDataHeader>ID</TableDataHeader>
                            <TableDataHeader>Názov</TableDataHeader>
                            <TableDataHeader>Dátum</TableDataHeader>
                            <TableDataHeader>Začiatok</TableDataHeader>
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
                        <FontAwesomeIcon size='1x' icon='chevron-left' color='#0063ff' />
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
                        <FontAwesomeIcon size='1x' icon='chevron-right' color='#0063ff' />
                    </PagingButton>
                </PagingDiv>
            </Wrapper>
        </>
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
    margin-top: 40px;
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
    min-width: 90%;
    text-align: left;

    border-top: 1px solid #d5dee3;
    border-collapse: collapse;
`;

export const TableRow = styled.tr`
    border-bottom: 1px solid #d5dee3;
`;

const TableDataHeader = styled.th<{ hideOnMobile?: boolean }>`
    padding: 6px;
    text-align: left;

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
