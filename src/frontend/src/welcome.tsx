import React from 'react';
import { Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import Home from 'home/home';
import App, { url } from './App';
import Login from './login';

function Welcome() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const cookie = cookies['token-object'];
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setHours(today.getHours() + 24)

    if (cookie) {
        cookie.endDate = new Date(cookie.endDate);

        console.log(cookie.endDate, nextDay)

        if (cookie.endDate <= nextDay) {
            axios
                .post(`${url}/api/v1/user/refresh`, {
                    token: cookie.token
                }).then(response => {
                    setToken(response.data.access_token, response.data.expires_in);
                }).catch(error => {
                    console.error(error)
                    removeCookie('token-object');
                    window.location.reload(false);
                })
        } else if (cookie.endDate === undefined || cookie.endDate <= today) {
            removeCookie('token-object');
        }
    }

    function setToken(token: string, expiresIn: number) {
        const today = new Date();
        const expirationDate = new Date(today)
        expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn)

        setCookie('token-object', {
            token,
            endDate: expirationDate,
        });
        window.location.reload(false);
    }

    const token = cookie && cookie.endDate && cookie.endDate > today ? cookie.token : '';

    return (
        <Route>
            {({ location }) => {
                if (location.pathname === '/public') {
                    return <Home handleError={(error) => {}} isPublic={true} />;
                }

                if (token === '') {
                    return (
                        <Login
                            setLogin={setToken}
                        />
                    );
                } else {
                    return <App token={token} />;
                }
            }}
        </Route>
    );
}

export default Welcome;
