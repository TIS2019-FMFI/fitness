import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface Props {
    onClick: () => void;
    disabled: boolean;
    checked: boolean;
}

function Checkbox(props: Props) {
    const { disabled, checked } = props;

    function onClick() {
        if (!disabled) {
            props.onClick();
        }
    }

    return (
        <React.Fragment>
            {checked ? (
                <Icon size='lg' icon='check-circle' disabled={disabled} onClick={onClick} />
            ) : (
                <Icon size='lg' icon={['far', 'circle']} disabled={disabled} onClick={onClick} />
            )}
        </React.Fragment>
    );
}

const Icon = styled(FontAwesomeIcon)<{ disabled: boolean }>`
    color: ${props => (props.disabled ? '#bdc3c7' : '#0063ff')};
`;

export default Checkbox;
