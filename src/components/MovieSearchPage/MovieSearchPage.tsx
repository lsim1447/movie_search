import React, { useState } from 'react';
import styled from 'styled-components';
import useMovieSearch from '../../hooks/useMovieSearch';
import { MovieCard } from '../MovieCard';
import { LoadingSpinner } from '../LoadingSpinner';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  width: 300px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const MovieList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  justify-content: center;
`;

export const MovieTitle = styled.span`
  display: block;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
`;

export const MovieSearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const { movies, error, loading, searchMovies } = useMovieSearch(query);

  const handleSearch = () => {
      searchMovies();
  };

  return (
    <Container>
      <h1>Movie Search</h1>

      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
      />
      <Button onClick={handleSearch}> Search </Button>

      {loading && <LoadingSpinner />}
      {error && <p>{error}</p>}

      <MovieList>
        {movies.map((movie) => (
          <MovieCard key={movie.id} title={movie.title} posterPath={movie.poster_path} />
        ))}
      </MovieList>
    </Container>
  );
};
