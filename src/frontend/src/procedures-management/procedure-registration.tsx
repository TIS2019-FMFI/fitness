import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Button, Input } from 'reactstrap';

import { Procedure } from './procedures-management';
import Checkbox from '../client-management/client-entry/checkbox';

export interface Props {
    registerProcedure: (procedure: Procedure) => void;
    setIsOpen: (isOpen: boolean) => void;
}

function ProcedureRegistration(props: Props) {
    const { setIsOpen } = props;
    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isForMultisportCard, setIsForMultisportCard] = useState(false);

    function registerProcedure() {
        const procedure = {
            name,
            isActive,
            isForMultisportCard,
        } as Procedure;

        props.registerProcedure(procedure);
        setIsOpen(false);
    }

    return (
        <Modal isOpen={true} onRequestClose={() => setIsOpen(false)} style={ModalStyles} contentLabel='Example Modal'>
            <div>
                <h2 style={{ margin: 0 }}>Nová procedúra</h2>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', marginBottom: '10px' }}>
                    <span>Názov</span>
                    <StyledInput type='text' value={name} onChange={event => setName(event.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <StyledLabel>Aktívny</StyledLabel>
                        <Checkbox checked={isActive} disabled={false} onClick={() => setIsActive(!isActive)} />
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <StyledLabel>Multisport</StyledLabel>
                        <Checkbox
                            checked={isForMultisportCard}
                            disabled={false}
                            onClick={() => setIsForMultisportCard(!isForMultisportCard)}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button disabled={name === ''} color='success' onClick={registerProcedure}>
                        Pridať
                        <FontAwesomeIcon style={{ marginLeft: '4px' }} icon='save' />
                    </Button>
                    <Button onClick={() => setIsOpen(false)}>
                        Zrušit
                        <FontAwesomeIcon style={{ marginLeft: '4px' }} icon='window-close' />
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

const ModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        minWidth: '400px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const StyledInput = styled(Input)`
    margin-left: 10px;
`;

const StyledLabel = styled.span`
    margin: 5px;
    margin-left: 0;
`;

export default ProcedureRegistration;
