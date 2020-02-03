import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HistoryEntry from './history-entry';
import { TokenContext, url } from '../App';
import { Button, Input } from 'reactstrap';
import './stylesH.css';

export interface ClientHistory {
    id: number;
    name: string;
    procedure: string;
    date: string;
    start: string;
    end: string;
}

export interface Props {
    handleError: (error) => void;
}

const PER_PAGE = 10;

function ClientHistory(props: Props) {
    const location = useLocation();
    const history = useHistory();
    const [maxPage, setMaxPage] = useState(999);
    const match = location.search.match(/page=([0-9]+)/);
    const matchedNumber = (match && match.length > 1 && Number(match[1])) || null;
    const [page, setPage] = useState(matchedNumber > 0 && matchedNumber <= maxPage ? matchedNumber : 1);
    const [clientHistory, setClientHistory] = useState([]);
    const [data, setData] = useState('');
    const token = useContext(TokenContext);

    if (match === null || matchedNumber !== page) {
        history.push(`/historia/clients?page=${page}`);
    }

    useEffect(() => {
        fetchClientHistory(page);
    }, [page]);

    async function fetchClientHistory(page: number) {
        axios
            .get(`${url}/api/v1/clients/history?orderBy=id&page=${page}&perPage=${PER_PAGE}&data=${data}`, {
                headers: { Authorization: 'Bearer ' + token },
            })
            .then(res => {
                setClientHistory(
                    res.data.items.map((object: any) => {
                        return {
                            id: object.order_id,
                            name: `${object.first_name} ${object.last_name}`,
                            procedure: object.name,
                            date: object.start_time.split(' ')[0],
                            start:
                                object.start_time.split(' ')[1].split(':')[0] +
                                ':' +
                                object.start_time.split(' ')[1].split(':')[1],
                            end:
                                object.end_time.split(' ')[1].split(':')[0] +
                                ':' +
                                object.end_time.split(' ')[1].split(':')[1],
                        };
                    })
                );
                setMaxPage(res.data.lastPage);
            })
            .catch((error: any) => {
                props.handleError(error);
                window.alert('Nastala chyba pri načitávaní histórie.');
            });
    }

    function changePage(newPage: number) {
        setPage(newPage);
        history.push(`/historia/clients?page=${page}`);
        fetchClientHistory(newPage);
    }

    return (
        <>
            <div style={{ display: 'flex', marginTop: 40 }}>
                <StyledInput
                    placeholder={'Zadajte meno alebo telefónne číslo'}
                    type='text'
                    onChange={event => setData(event.target.value)}
                />
                <StyledButton onClick={() => changePage(1)}>Hľadaj</StyledButton>
                <a
                    id='export'
                    style={{ marginLeft: 20 }}
                    href={`http://localhost/api/v1/clients/history/export?token=${token}`}
                >
                    <p id='text-export'>Export</p>
                </a>
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
                            <TableDataHeader>Meno a priezvisko</TableDataHeader>
                            <TableDataHeader>Procedúra</TableDataHeader>
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

const StyledButton = styled(Button)`
    background-color: #0063ff;
    height: 40px;
    margin-left: 10px;
`;

const StyledInput = styled(Input)`
    height: 40px;
    margin-bottom: 10px;
    width: 400px;
`;

const Wrapper = styled.div`
    margin-top: 20px;
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
    height: 50px;
    text-align: left;
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

export default ClientHistory;
