import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-top: 8px solid #007bff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${spin} 1s linear infinite;
    margin: 20px auto;
`;

export const LoadingSpinner: React.FC = () => {
    return <Spinner />;
};
