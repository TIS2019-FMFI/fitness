import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Button, Input } from 'reactstrap';

import { Client } from 'client-management/client-management';
import Checkbox from 'client-management/client-entry/checkbox';

export interface Props {
    registerClient: (client: Client) => void;
    setIsOpen: (isOpen: boolean) => void;
}

function ClientRegistration(props: Props) {
    const { setIsOpen } = props;
    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [number, setNumber] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [hasMultisportCard, setHasMultisportCard] = useState(false);
    const [isGDPR, setIsGDPR] = useState(false);

    function registerClient() {
        const client = {
            name,
            phone: number,
            note,
            isActive,
            hasMultisportCard,
            isGDPR,
        } as Client;
        
        props.registerClient(client);
        setIsOpen(false);
    }
    
    return (
            <Modal
                isOpen={true}
                onRequestClose={() => setIsOpen(false)}
                style={ModalStyles}
                contentLabel='Example Modal'
            >
                <div>
                    <h2 style={{ margin: 0 }}>Nový klient</h2>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', marginBottom: '10px' }}>
                        <span>Meno a priezvisko</span>
                        <StyledInput type='text' value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', marginBottom: '10px' }}>
                        <span>Telefónne číslo</span>
                        <StyledInput type='number' value={number} onChange={event => setNumber(event.target.value)} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center'}}>
                            <StyledLabel>Aktívny</StyledLabel>
                            <Checkbox checked={isActive} disabled={false} onClick={() => setIsActive(!isActive)} />
                        </div>
                        <div style={{ display: 'inline-flex', alignItems: 'center'}}>
                            <StyledLabel>Multisport</StyledLabel>
                            <Checkbox checked={hasMultisportCard} disabled={false} onClick={() => setHasMultisportCard(!hasMultisportCard)} />
                        </div>
                        <div style={{ display: 'inline-flex', alignItems: 'center'}}>
                            <StyledLabel>GDPR</StyledLabel>
                            <Checkbox checked={isGDPR} disabled={false} onClick={() => setIsGDPR(!isGDPR)} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', marginBottom: '10px' }}>
                        <span>Poznámka</span>
                        <StyledInput type='textarea' value={note} onChange={event => setNote(event.target.value)} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Button disabled={name === ''} color='success' onClick={registerClient}>
                            Pridať
                            <FontAwesomeIcon style={{ marginLeft: '4px'}} icon='save' />
                        </Button>
                        <Button onClick={() => setIsOpen(false)}>
                            Zrušit
                            <FontAwesomeIcon style={{ marginLeft: '4px'}} icon='window-close' />
                        </Button>
                    </div>
                </div>
            </Modal>
    )
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

export default ClientRegistration;
