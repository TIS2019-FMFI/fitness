import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Container>
                <Menu>
                    <Route>
                        {({ location }) => (
                            <React.Fragment>
                                <MenuLink
                                    to='/'
                                    selected={location.pathname === '/' || location.pathname === '/reservation'}
                                >
                                    <span>Rezervacie</span>
                                </MenuLink>
                                <MenuLink to='/history' selected={location.pathname === '/history'}>
                                    <span>Historia objednavok</span>
                                </MenuLink>
                                <MenuLink to='/users' selected={location.pathname === '/users'}>
                                    <span>Sprava klientov</span>
                                </MenuLink>
                                <MenuLink to='/procedures' selected={location.pathname === '/procedures'}>
                                    <span>Stroje a procedury</span>
                                </MenuLink>
                            </React.Fragment>
                        )}
                    </Route>
                </Menu>
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

const Menu = styled.div`
    display: flex;
    flex-flow: column;
`;

const MenuLink = styled(Link)`
    color: Blue;
    text-decoration: none;
    background-color: ${props => (props.selected ? 'red' : 'unset')};
`;

export default App;
