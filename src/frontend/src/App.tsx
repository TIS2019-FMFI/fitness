import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from './navigation/navigation';

function App() {
    return (
        <Router>
            <Container>
                <Route>{({ location }) => <Navigation path={location.pathname} />}</Route>
                <Switch>
                    <Route path='/users'>
                        <p>Users</p>
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
                    <Route path='/'>
                        <p>Main</p>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

const Container = styled.div`
    display: flex;
    flex-flow: row;
`;

export default App;
