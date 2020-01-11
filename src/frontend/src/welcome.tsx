import React from 'react';
import { Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Home from 'home/home';
import App from './App';
import Login from './login';

function Welcome() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const cookie = cookies['token-object'];
    const today = new Date();

    if (cookie) {
        cookie.endDate = new Date(cookie.endDate);

        if (cookie.endDate && cookie.endDate <= today) {
            removeCookie('token-object');
        }
    }

    const token = cookie && cookie.endDate && cookie.endDate > today ? cookie.token : '';

    return (
        <Route>
            {({ location }) => {
                if (location.pathname === '/public') {
                    return <Home isPublic={true} />;
                }

                if (token === '') {
                    return (
                        <Login
                            setLogin={(token: string, endDate: Date) => {
                                setCookie('token-object', {
                                    token,
                                    endDate,
                                });
                                window.location.reload(false);
                            }}
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
