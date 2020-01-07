import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from './navigation/navigation';
import ClientManagement from './client-management/client-management';
import Home from './home/home';

function App() {
    return (
        <Router>
            <Container>
                <Route>{({ location }) => <Navigation path={location.pathname} />}</Route>
                <Switch>
                    <MainContent>
                        <Route path='/klienty'>
                            <ClientManagement />
                        </Route>
                        <Route path='/rezervacie'>
                            <Home />
                        </Route>
                        <Route path='/procedury'>
                            <p>procedures</p>
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
