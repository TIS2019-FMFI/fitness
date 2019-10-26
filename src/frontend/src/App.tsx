import React from 'react';
import styled from 'styled-components';

import snakeoil from './images/snakeoil.jpg';

const AppHeader = styled.div`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const Logo = styled.img`
    height: 40vmin;
`;

export interface Props {}

class App extends React.Component<Props> {
    render() {
        return (
            <AppHeader>
                <Logo src={snakeoil} alt='logo' />
            </AppHeader>
        );
    }
}

export default App;
