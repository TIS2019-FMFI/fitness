import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './styles.css';

export interface Props {
    path: string;
}

class Navigation extends React.PureComponent<Props> {
    render() {
        const { path } = this.props;
        return (
            <NavigationContainer>
                <StyledLink to='/rezervacie' isActive={'/rezervacie' === path}>
                    <span>Rezervacie</span>
                </StyledLink>
                <StyledLink to='/historia' isActive={'/historia' === path}>
                    <span>Historia objednavok</span>
                </StyledLink>
                <StyledLink to='/klienty' isActive={'/klienty' === path}>
                    <span>Sprava klientov</span>
                </StyledLink>
                <StyledLink to='/procedury' isActive={'/procedury' === path}>
                    <span>Stroje a procedury</span>
                </StyledLink>
            </NavigationContainer>
        );
    }
}

const NavigationContainer = styled.div`
    padding-top: 15%;
    display: flex;
    flex-flow: column;
    height: 100%;
    background-color: blue;
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
    padding: 3px;
    background-color: ${props => (props.isActive ? 'white' : 'blue')};
    color: ${props => (props.isActive ? 'blue' : 'white')};
    display: flex;
    flex-flow: column;
    text-decoration: none;
`;

export default Navigation;
