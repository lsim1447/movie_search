// src/components/MovieCard.tsx
import React from 'react';
import styled from 'styled-components';
import { POSTER_BASE_URL } from '../../utils/constants';

export const MovieCardContainer = styled.li`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 220px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-50px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const Poster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const MovieTitle = styled.h3`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 0;
`;

interface MovieCardProps {
  title: string;
  posterPath: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ title, posterPath }) => {
  return (
    <MovieCardContainer>
      <Poster src={`${POSTER_BASE_URL}${posterPath}`} alt={title} />
      <MovieTitle>{title}</MovieTitle>
    </MovieCardContainer>
  );
};
