import axios from 'axios';
import styled from 'styled-components';
import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';

export interface Props {
    setLogin: (token: string, endDate: Date) => void;
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
            .post('http://localhost/api/v1/user/login', object)
            .then(response => {
                if (response.data.success) {
                    const d = new Date();
                    d.setMonth(10);
                    props.setLogin(response.data.data.auth_token, d);
                } else {
                    window.alert('Zle heslo');
                }
            })
            .catch(() => {
                window.alert('Zle heslo');
            });
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
