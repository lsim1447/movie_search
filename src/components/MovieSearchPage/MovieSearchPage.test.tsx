import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MovieSearchPage } from './MovieSearchPage';
import * as useMovieSearchHook from '../../hooks/useMovieSearch';

jest.mock('../../hooks/useMovieSearch');

describe('MovieSearchPage', () => {
  it('renders the search input, button, and calls the search function on button click', async () => {
    const mockSearchMovies = jest.fn();
    const mockUseMovieSearch = {
      movies: [],
      error: '',
      loading: false,
      searchMovies: mockSearchMovies,
    };

    jest.spyOn(useMovieSearchHook, 'default').mockReturnValue(mockUseMovieSearch);

    render(<MovieSearchPage />);

    const searchInput = screen.getByPlaceholderText('Search for a movie...');
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'Inception' } });
    fireEvent.click(searchButton);

    expect(mockSearchMovies).toHaveBeenCalled();
  });

  it('displays a loading spinner while fetching movies', () => {
    const mockUseMovieSearch = {
      movies: [],
      error: '',
      loading: true,
      searchMovies: jest.fn(),
    };

    jest.spyOn(useMovieSearchHook, 'default').mockReturnValue(mockUseMovieSearch);

    render(<MovieSearchPage />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('displays an error message if the search fails', () => {
    const mockUseMovieSearch = {
      movies: [],
      error: 'Something went wrong!',
      loading: false,
      searchMovies: jest.fn(),
    };

    jest.spyOn(useMovieSearchHook, 'default').mockReturnValue(mockUseMovieSearch);

    render(<MovieSearchPage />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });

  it('displays a message if no movies are found', () => {
    const mockUseMovieSearch = {
      movies: [],
      error: '',
      loading: false,
      searchMovies: () => {},
    };

    jest.spyOn(useMovieSearchHook, 'default').mockReturnValue(mockUseMovieSearch);

    render(<MovieSearchPage />);

    expect(screen.getByText('No movies found. Try a different search!')).toBeInTheDocument();
  });

  it('displays a list of movies when search results are available', () => {
    const mockMovies = [
      { id: 1, title: 'Inception', poster_path: '/poster1.jpg' },
      { id: 2, title: 'The Dark Knight', poster_path: '/poster2.jpg' },
    ];

    const mockUseMovieSearch = {
      movies: mockMovies,
      error: '',
      loading: false,
      searchMovies: jest.fn(),
    };

    jest.spyOn(useMovieSearchHook, 'default').mockReturnValue(mockUseMovieSearch as any);

    render(<MovieSearchPage />);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
  });
});