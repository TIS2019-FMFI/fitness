import axios from 'axios';
import styled from 'styled-components';
import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';

import { url } from 'App'

import logo from './malaki_logo.png';

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
                    window.alert('Zadali ste zlé prihlasovacie údaje');
                }
            })
            .catch((error) => {
                window.alert('Zadali ste zlé prihlasovacie údaje');
                console.error(error);
            })
    }

    return (
        <div style={{backgroundColor: '#F4F5F9'}}>
            <Triangle></Triangle>
            <img src={logo} alt="Logo" style={{position: 'absolute', left: '20px', top: '20px'}}/>
            <LoginWrapper style={{ padding: '10px' }}>
                <h1>Prihlásenie</h1>
                <form>
                    <Input placeholder='Email' value={email} onChange={event => setEmail(event.target.value)} style={{ marginTop: '35px' }}/>
                    <Input
                        placeholder='Heslo'
                        value={password}
                        type='password'
                        onChange={event => setPassword(event.target.value)}
                        style={{ marginTop: '25px' }}
                    />
                    <StyledButton
                        color='primary'
                        onClick={() => {
                            postCredentials();
                        }}
                        style={{ marginTop: '35px' }}
                    >
                        Prihlásiť
                    </StyledButton>
                </form>
            </LoginWrapper>
        </div>
    );
}

const Triangle = styled.div`
    width: 70%;
    height: 70%;
    position: absolute;
    right: 0;
    clip-path: polygon(100% 0%, 0 0, 100% 80%);
    background: linear-gradient(52deg, rgba(163, 163, 163, 0.09) 0%, rgba(163, 163, 163, 0.09) 33.3%,rgba(100, 100, 100, 0.09) 33.3%, rgba(100, 100, 100, 0.09) 66.6%,rgba(162, 162, 162, 0.09) 66.6%, rgba(162, 162, 162, 0.09) 99%),linear-gradient(258deg, rgba(193, 193, 193, 0.06) 0%, rgba(193, 193, 193, 0.06) 33.3%,rgba(169, 169, 169, 0.06) 33.3%, rgba(169, 169, 169, 0.06) 66.6%,rgba(92, 92, 92, 0.06) 66.6%, rgba(92, 92, 92, 0.06) 99%),linear-gradient(129deg, rgba(45, 45, 45, 0.03) 0%, rgba(45, 45, 45, 0.03) 33.3%,rgba(223, 223, 223, 0.03) 33.3%, rgba(223, 223, 223, 0.03) 66.6%,rgba(173, 173, 173, 0.03) 66.6%, rgba(173, 173, 173, 0.03) 99%),linear-gradient(280deg, rgba(226, 226, 226, 0.06) 0%, rgba(226, 226, 226, 0.06) 33.3%,rgba(81, 81, 81, 0.06) 33.3%, rgba(81, 81, 81, 0.06) 66.6%,rgba(186, 186, 186, 0.06) 66.6%, rgba(186, 186, 186, 0.06) 99%),linear-gradient(85deg, rgba(225, 225, 225, 0.04) 0%, rgba(225, 225, 225, 0.04) 33.3%,rgba(95, 95, 95, 0.04) 33.3%, rgba(95, 95, 95, 0.04) 66.6%,rgba(39, 39, 39, 0.04) 66.6%, rgba(39, 39, 39, 0.04) 99%),linear-gradient(128deg, rgba(184, 184, 184, 0.06) 0%, rgba(184, 184, 184, 0.06) 33.3%,rgba(0, 0, 0, 0.06) 33.3%, rgba(0, 0, 0, 0.06) 66.6%,rgba(140, 140, 140, 0.06) 66.6%, rgba(140, 140, 140, 0.06) 99.89999999999999%),linear-gradient(323deg, rgba(40, 40, 40, 0.07) 0%, rgba(40, 40, 40, 0.07) 33.3%,rgba(214, 214, 214, 0.07) 33.3%, rgba(214, 214, 214, 0.07) 66.6%,rgba(190, 190, 190, 0.07) 66.6%, rgba(190, 190, 190, 0.07) 99.89999999999999%),linear-gradient(61deg, rgba(230, 230, 230, 0) 0%, rgba(230, 230, 230, 0) 33.3%,rgba(241, 241, 241, 0) 33.3%, rgba(241, 241, 241, 0) 66.6%,rgba(55, 55, 55, 0) 66.6%, rgba(55, 55, 55, 0) 99%),linear-gradient(0deg, #2625e3,#0bbaef);
`;


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
