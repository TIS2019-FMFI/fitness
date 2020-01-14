import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//import leftArrowImage from '/images/left_arrow.svg';
//import rightArrowImage from '/images/right_arrow.svg';

import ProcedureEntry from './procedure-entry';

export interface Procedure {
    id: number;
    name: string;
    isActive: boolean;
    isForMultisportCard: boolean;
}

const PER_PAGE = 10;

function ProcedureManagement() {
    const location = useLocation();
    const history = useHistory();
    const [maxPage, setMaxPage] = useState(999);
    const match = location.search.match(/page=([0-9]+)/);
    const matchedNumber = (match && match.length > 1 && Number(match[1])) || null;
    const [page, setPage] = useState(matchedNumber > 0 && matchedNumber <= maxPage ? matchedNumber : 1);
    const [procedures, setProcedures] = useState([]);

    if (match === null || matchedNumber !== page) {
        history.push(`/procedury?page=${page}`);
    }

    useEffect(() => {
        fetchProcedures(page);
    }, [page]);

    async function fetchProcedures(page: number) {
        axios
            .get(`http://localhost/api/v1/machines-and-procedures?orderBy=id&page=${page}&perPage=${PER_PAGE}`)
            .then(res => {
                setProcedures(
                    res.data.items.map((object: any) => {
                        return {
                            id: object.id,
                            name: object.name,
                            isActive: object.active,
                            isForMultisportCard: object.is_for_multisport_card,
                        };
                    })
                );
                setMaxPage(res.data.lastPage);
            })
            .catch((error: any) => {
                window.alert('Nastala chyba pri načitávaní strojov a procedúr');
                console.log(error);
            });
    }

    async function updateProcedure(procedure: Procedure) {
        axios
            .post(`http://localhost/api/v1/machines-and-procedures/${procedure.id}`, {
                name: procedure.name,
                active: procedure.isActive,
                is_for_multisport_card: procedure.isForMultisportCard,
            })
            .then(() => {
                fetchProcedures(page);
            });
    }

    async function deleteProcedure(procedure: Procedure) {
        axios
            .delete(`http://localhost/api/v1/machines-and-procedures/${procedure.id}`)
            .then(() => {
                fetchProcedures(page);
            })
            .catch((error: any) => {
                window.alert('Nastala chyba pri vymazávaní stroja/procedúry');
                console.log(error);
            });
    }

    function changePage(newPage: number) {
        setPage(newPage);
        history.push(`/procedury?page=${page}`);
        fetchProcedures(newPage);
    }

    return (
        <Wrapper>
            <Header>
                <Icon icon='bars' color='#0063ff' />
                <HeaderText>Stroje a procedúry</HeaderText>
            </Header>
            <Table>
                <tbody>
                    <TableRow>
                        <TableDataHeader>ID</TableDataHeader>
                        <TableDataHeader>Názov</TableDataHeader>
                        <TableDataHeader>Aktívny</TableDataHeader>
                        <TableDataHeader>Multisport</TableDataHeader>
                        <TableDataHeader></TableDataHeader>
                    </TableRow>
                    {procedures.map(procedure => (
                        <ProcedureEntry
                            key={procedure.id}
                            procedure={procedure}
                            updateProcedure={updateProcedure}
                            deleteProcedure={deleteProcedure}
                        />
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

export default ProcedureManagement;
