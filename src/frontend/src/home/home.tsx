import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Procedure } from 'procedures-management/procedures-management';

import ProcedureRow from './procedure-row/procedure-row';

function Home() {
    const [procedures, setProcedures] = useState([]);

    useEffect(() => {
        fetchProcedures();
    }, []);

    function fetchProcedures() {
        axios.get(`http://localhost/api/v1/machines-and-procedures?orderBy=id`).then(res => {
            setProcedures(
                res.data.map(object => {
                    return {
                        id: object.id,
                        name: object.name,
                        active: object.active,
                        isForMultisportCard: object.is_for_multisport_card,
                    };
                })
            );
        });
    }

    return (
        <React.Fragment>
            <p>HomeScreen</p>
            {procedures.map((procedure: Procedure) => (
                <ProcedureRow procedure={procedure} />
            ))}
        </React.Fragment>
    );
}

export default Home;
