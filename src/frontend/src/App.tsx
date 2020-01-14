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

function App() {
    return (
        <Router>
            <Container>
                <Route>{({ location }) => <Navigation path={location.pathname} />}</Route>
                <Switch>
                    <MainContent>
                        <Route path='/klienti'>
                            <ClientManagement />
                        </Route>
                        <Route path='/rezervacie'>
                            <Home />
                        </Route>
                        <Route path='/procedury'>
                            <Procedures />
                        </Route>
                        <Route path='/historia'>
                            <p>history</p>
                        </Route>
                        <Route exact={true} path='/'>
                            <p>Main</p>
                        </Route>
                    </MainContent>
                </Switch>
            </Container>
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
