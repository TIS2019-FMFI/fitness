import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from './navigation/navigation';
import UserManagement from './user-management/user-management';
import Home from './home/home';

function App() {
    return (
        <Router>
            <Container>
                <Route>{({ location }) => <Navigation path={location.pathname} />}</Route>
                <Switch>
                    <MainContent>
                        <Route path='/klienty'>
                            <UserManagement />
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
    display: flex;
    flex-flow: row;

    background-color: #f4f5f9;
`;

const MainContent = styled.div`
    margin-left: 40px;
`;

export default App;
