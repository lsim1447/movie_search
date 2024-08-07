import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useMovieSearch from '../../hooks/useMovieSearch';
import { MovieCard } from '../MovieCard';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage';
import { NoMoviesMessage } from '../NoMoviesMessage';

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

export const Header = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  background: linear-gradient(135deg, #007bff 0%, #00c6ff 100%);
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%);
    transform: rotate(45deg);
    z-index: 1;
  }

  & > span {
    position: relative;
    z-index: 2;
  }
`;

export const MovieSearchPage: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [query, setQuery] = useState<string>('');
  const [movieNotFound, setMovieNotFound] = useState(false)
  const { movies, error, loading, searchMovies } = useMovieSearch(query);

  const handleSearch = () => {
    setIsClicked(true);
    searchMovies();
  };

  useEffect(() => {
    if (isClicked) {
      setMovieNotFound(!error && movies.length === 0)
    } else {
      setMovieNotFound(error === '' && movies.length === 0)
    }
  }, [isClicked, error, movies])

  return (
    <Container>
      <Header>
        <span>Movie Search</span>
      </Header>

      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
      />
      <Button onClick={handleSearch}> Search </Button>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {movieNotFound && <NoMoviesMessage />}

      <MovieList>
        {movies.map((movie) => (
          <MovieCard key={movie.id} title={movie.title} posterPath={movie.poster_path} />
        ))}
      </MovieList>
    </Container>
  );
};
