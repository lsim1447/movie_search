import React from 'react';
import styled from 'styled-components';

export const NoMoviesMessage: React.FC = () => {
  return (
    <MessageContainer>
      <Message>No movies found. Try a different search!</Message>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  margin-top: 20px;
  background-color: #f1f1f1;
  border-radius: 8px;
`;

const Message = styled.p`
  font-size: 18px;
  color: #555;
  text-align: center;
`;