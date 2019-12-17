import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import proceduresImage from 'images/procedures.svg';
import inboxImage from 'images/inbox.svg';
import historyImage from 'images/history.svg';
import peopleOutlinedImage from 'images/people_outline.svg';

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
                    <LinkDiv>
                        <LinkImage src={inboxImage} />
                        <span>Rezervacie</span>
                    </LinkDiv>
                </StyledLink>
                <StyledLink to='/historia' isActive={'/historia' === path}>
                    <LinkDiv>
                        <LinkImage src={historyImage} />
                        <span>Historia objednavok</span>
                    </LinkDiv>
                </StyledLink>
                <StyledLink to='/klienty' isActive={'/klienty' === path}>
                    <LinkDiv>
                        <LinkImage src={peopleOutlinedImage} />
                        <span>Sprava klientov</span>
                    </LinkDiv>
                </StyledLink>
                <StyledLink to='/procedury' isActive={'/procedury' === path}>
                    <LinkDiv>
                        <LinkImage src={proceduresImage} />
                        <span>Stroje a procedury</span>
                    </LinkDiv>
                </StyledLink>
            </NavigationContainer>
        );
    }
}

const NavigationContainer = styled.div`
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
`;

const LinkImage = styled.img`
    margin: 0 10px;
`;

export default Navigation;
