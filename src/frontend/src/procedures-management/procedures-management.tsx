import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProcedureEntry from './procedure-entry';
import { TokenContext, url } from '../App';
import ProcedureRegistration from './procedure-registration';

export interface Procedure {
    id: number;
    name: string;
    isActive: boolean;
    isForMultisportCard: boolean;
}

export interface Props {
    handleError: (error) => void;
}

const PER_PAGE = 10;

function ProcedureManagement(props: Props) {
    const location = useLocation();
    const history = useHistory();
    const [maxPage, setMaxPage] = useState(999);
    const match = location.search.match(/page=([0-9]+)/);
    const matchedNumber = (match && match.length > 1 && Number(match[1])) || null;
    const [page, setPage] = useState(matchedNumber > 0 && matchedNumber <= maxPage ? matchedNumber : 1);
    const [procedures, setProcedures] = useState([]);
    const token = useContext(TokenContext);
    const [addingProcedure, setAddingProcedure] = useState(false);

    if (match === null || matchedNumber !== page) {
        history.push(`/procedury?page=${page}`);
    }

    useEffect(() => {
        fetchProcedures(page);
    }, [page]);

    async function fetchProcedures(page: number) {
        axios
            .get(`${url}/api/v1/machines-and-procedures?orderBy=id&page=${page}&perPage=${PER_PAGE}`, {
                headers: { Authorization: 'Bearer ' + token },
            })
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
                props.handleError(error);
                window.alert('Nastala chyba pri načitávaní strojov a procedúr');
            });
    }

    async function updateProcedure(procedure: Procedure) {
        axios
            .post(
                `${url}/api/v1/machines-and-procedures/${procedure.id}`,
                {
                    name: procedure.name,
                    active: procedure.isActive,
                    is_for_multisport_card: procedure.isForMultisportCard,
                },
                { headers: { Authorization: 'Bearer ' + token } }
            )
            .then(() => {
                fetchProcedures(page);
            })
            .then(error => {
                props.handleError(error);
            });
    }

    async function deleteProcedure(procedure: Procedure) {
        axios
            .delete(`${url}/api/v1/machines-and-procedures/${procedure.id}`, {
                headers: { Authorization: 'Bearer ' + token },
            })
            .then(() => {
                fetchProcedures(page);
            })
            .catch((error: any) => {
                window.alert('Nastala chyba pri vymazávaní stroja/procedúry');
            })
            .then(error => {
                props.handleError(error);
            });
    }

    function registerProcedure(procedure: Procedure) {
        axios
            .post(
                `${url}/api/v1/machines-and-procedures`,
                {
                    name: procedure.name,
                    active: procedure.isActive,
                    is_for_multisport_card: procedure.isForMultisportCard,
                },
                { headers: { Authorization: 'Bearer ' + token } }
            )
            .then(() => {
                fetchProcedures(page);
            })
            .catch((error: any) => {
                props.handleError(error);
                window.alert('Nastala chyba pri pridávaní novej procedúry');
            });
    }

    function changePage(newPage: number) {
        setPage(newPage);
        history.push(`/procedury?page=${page}`);
        fetchProcedures(newPage);
    }

    return (
        <React.Fragment>
            <Wrapper>
                <Header>
                    <Icon size='3x' icon='bars' color='#0063ff' />
                    <HeaderText>Stroje a procedúry</HeaderText>
                    <Icon
                        size='3x'
                        icon={['far', 'plus-square']}
                        color='#0063ff'
                        onClick={() => setAddingProcedure(true)}
                    />
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
            {addingProcedure ? (
                <ProcedureRegistration
                    registerProcedure={(procedure: Procedure) => registerProcedure(procedure)}
                    setIsOpen={setAddingProcedure}
                />
            ) : null}
        </React.Fragment>
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
