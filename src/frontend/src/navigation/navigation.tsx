import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.css';

export interface Props {
    path: string;
}

class Navigation extends React.PureComponent<Props> {
    render() {
        const { path } = this.props;
        return (
            <NavigationContainer>
                <StyledLink to='/' isActive={'/' === path}>
                    <LinkDiv>
                        <LinkImage icon={'/' === path ? 'bookmark' : ['far', 'bookmark']} />
                        <LinkText>Rezervacie</LinkText>
                    </LinkDiv>
                </StyledLink>
                <StyledLink to='/historia' isActive={'/historia' === path}>
                    <LinkDiv>
                        <LinkImage icon={'history'} />
                        <LinkText>Historia objednavok</LinkText>
                    </LinkDiv>
                </StyledLink>
                <StyledLink to='/klienty' isActive={'/klienty' === path}>
                    <LinkDiv>
                        <LinkImage icon={'/klienty' === path ? 'user' : ['far', 'user']} />
                        <LinkText>Sprava klientov</LinkText>
                    </LinkDiv>
                </StyledLink>
                <StyledLink to='/procedury' isActive={'/procedury' === path}>
                    <LinkDiv>
                        <LinkImage icon={'dumbbell'} />
                        <LinkText>Stroje a procedury</LinkText>
                    </LinkDiv>
                </StyledLink>
            </NavigationContainer>
        );
    }
}

const NavigationContainer = styled.div`
    width: 240px;
    padding-top: 200px;

    display: flex;
    flex-flow: column;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;

    background-color: #0063ff;
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
    padding: 5px;
    margin: 5px 0 5px 10px;

    display: flex;
    flex-flow: column;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;

    text-decoration: none;

    background-color: ${props => (props.isActive ? '#f4f5f9' : '#0063ff')};
    color: ${props => (props.isActive ? '#0063ff' : 'white')};
`;

const LinkDiv = styled.div`
    display: flex;
    align-items: center;
`;

const LinkImage = styled(FontAwesomeIcon)`
    margin: 0 10px;
`;

const LinkText = styled.span`
    white-space: nowrap;
`;

export default Navigation;
