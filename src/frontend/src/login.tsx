import axios from 'axios';
import styled from 'styled-components';
import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';

import { url } from 'App'

export interface Props {
    setLogin: (token: string, expiresIn: number) => void;
}

function Login(props: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function postCredentials() {
        const object = {
            email,
            password,
        };

        axios
            .post(`${url}/api/v1/user/login`, object)
            .then(response => {
                if (response.data.success) {
                    props.setLogin(response.data.data.auth_token, response.data.data.expires_in);
                } else {
                    window.alert('Zle heslo');
                }
            })
            .catch((error) => {
                window.alert('Zle heslo');
                console.error(error);
            })
    }

    return (
        <LoginWrapper style={{ padding: '10px' }}>
            <h1>Prihlasenie</h1>
            <br />
            <br />
            <Input placeholder='Email' value={email} onChange={event => setEmail(event.target.value)} />
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
