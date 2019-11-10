import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from './navigation/navigation';
import UserManagement from './user-management/user-management';

function App() {
    return (
        <Router>
            <Container>
                <Route>{({ location }) => <Navigation path={location.pathname} />}</Route>
                <Switch>
                    <MainContent>
                        <Route path='/users'>
                            <UserManagement />
                        </Route>
                        <Route path='/reservation'>
                            <p>reservation</p>
                        </Route>
                        <Route path='/procedures'>
                            <p>procedures</p>
                        </Route>
                        <Route path='/history'>
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
