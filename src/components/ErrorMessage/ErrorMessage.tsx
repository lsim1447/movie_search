import React from 'react';
import styled from 'styled-components';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <ErrorContainer>{message}</ErrorContainer>;
};

const ErrorContainer = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;