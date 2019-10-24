import React from 'react';
import Styled from '@react-app/styled';

import snakeoil from './images/snakeoil.jpg';
import defaultStyles from './App.scss';

export interface Props {
    styles: typeof defaultStyles;
}

class App extends React.Component<Props> {
    render() {
        const { styles } = this.props;

        return (
            <div className={styles.appHeader}>
                <img src={snakeoil} className={styles.appLogo} alt='logo' />
            </div>
        );
    }
}

export default Styled(defaultStyles)(App);
