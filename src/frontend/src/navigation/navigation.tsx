import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export interface Props {
    path: string;
}

class Navigation extends React.PureComponent<Props> {
    render() {
        return (
            <NavigationContainer>
                <Link to='/'>
                    <span>testorino</span>
                </Link>
            </NavigationContainer>
        );
    }
}

const NavigationContainer = styled.div`
    display: flex;
    flex-flow: column;
`;

export default Navigation;
