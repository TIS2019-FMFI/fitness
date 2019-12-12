import React from 'react';

import { Procedure } from 'procedures-management/procedures-management';

import ProcedureRow from './procedure-row/procedure-row';

function Home() {
    const procedures: Procedure[] = [{ name: 'procedure2', id: 1 }, { name: 'procedure1', id: 2 }];

    return (
        <React.Fragment>
            <p>HomeScreen</p>
            {procedures.map((procedure: { name: string; id: number }) => (
                <ProcedureRow procedure={procedure} />
            ))}
        </React.Fragment>
    );
}

export default Home;
