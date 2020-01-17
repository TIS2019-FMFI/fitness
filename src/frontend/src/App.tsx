import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    fas,
    faHistory,
    faDumbbell,
    faEdit,
    faTrash,
    faSave,
    faWindowClose,
    faPlusCircle,
    faBars,
    faCommentDots,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faUser, faBookmark, faCircle } from '@fortawesome/free-regular-svg-icons';

import Navigation from './navigation/navigation';
import ClientManagement from './client-management/client-management';
import Home from './home/home';
import Procedures from './procedures-management/procedures-management';
import HistoryC from './history/history-clients';
import HistoryM from './history/history-machines';

library.add(
    fas,
    faUser,
    faHistory,
    faBookmark,
    faDumbbell,
    faEdit,
    faTrash,
    faSave,
    faWindowClose,
    faPlusCircle,
    faBars,
    faCommentDots,
    faCheckCircle,
    faCircle
);

export const TokenContext = React.createContext('');

export interface Props {
    token: string;
}

function App(props: Props) {
    return (
        <Router>
            <TokenContext.Provider value={props.token}>
                <Container>
                    <Route>{({ location }) => <Navigation path={location.pathname} />}</Route>
                    <Switch>
                        <MainContent>
                            <Route path='/klienty'>
                                <ClientManagement />
                            </Route>
                            <Route path='/procedury'>
                                <Procedures />
                            </Route>
                            <Route path='/historia/machines'>
                                <HistoryM />
                            </Route>
                            <Route path='/historia/clients'>
                                <HistoryC />
                            </Route>
                            <Route exact path='/'>
                                <Home isPublic={false} />
                            </Route>
                        </MainContent>
                    </Switch>
                </Container>
            </TokenContext.Provider>
        </Router>
    );
}

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row;
    background-color: #f4f5f9;
`;

const MainContent = styled.div`
    margin-left: 40px;
    width: 100%;
`;

export default App;
