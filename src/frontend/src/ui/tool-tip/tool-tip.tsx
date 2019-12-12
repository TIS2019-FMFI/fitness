import React, { ReactNode } from 'react';
import styled from 'styled-components';

export interface Props {
    text: string;
    children: ReactNode;
}

function ToolTip(props: Props) {
    const { text, children } = props;

    return (
        <Wrapper>
            {children}
            <Text>{text}</Text>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const Text = styled.span`
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
    transition-delay: 1s;

    &:after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

    ${Wrapper}:hover & {
        visibility: visible
        opacity: 1;
    }
`;

export default ToolTip;
