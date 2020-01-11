import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Input, Button } from 'reactstrap';

export interface Props {
    setLogin: (token: string, endDate: Date) => void;
}

function Login(props: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function postCredentials() {
        const object = {
            username,
            password,
        };

        axios
            .post('localhost/login', object)
            .then(props => {
                console.log(props);
            })
            .catch(() => {
                window.alert('Zle heslo');
                const date = new Date();
                date.setMonth(4);
                props.setLogin('test', date);
            });
    }

    return (
        <LoginWrapper style={{ padding: '10px' }}>
            <h1>Prihlasenie</h1>
            <br />
            <br />
            <Input
                placeholder='Pouzivatelske meno'
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <br />
            <Input
                placeholder='Heslo'
                value={password}
                type='password'
                onChange={event => setPassword(event.target.value)}
            />
            <br />
            <StyledButton
                color='primary'
                onClick={() => {
                    postCredentials();
                }}
            >
                Prihlasit
            </StyledButton>
        </LoginWrapper>
    );
}

const LoginWrapper = styled.div`
    width: 400px;

    position: absolute;
    top: 30%;
    left: 10%;
`;

const StyledButton = styled(Button)`
    width: 100%;
`;

export default Login;
