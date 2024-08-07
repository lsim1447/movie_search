import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MovieSearchPage } from './MovieSearchPage';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('displays movies after successful search', async () => {
    const mockMovies = [
        { id: 1, title: 'Inception', poster_path: '/inception.jpg' },
        { id: 2, title: 'Interstellar', poster_path: '/interstellar.jpg' },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: { results: mockMovies } });

    render(<MovieSearchPage />);

    fireEvent.change(screen.getByPlaceholderText(/search for a movie/i), {
        target: { value: 'Inception' },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => screen.getByText(/inception/i));

    expect(screen.getByText(/inception/i)).toBeInTheDocument();
    expect(screen.getByText(/interstellar/i)).toBeInTheDocument();
});

test('displays error message on API failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API failure'));

    render(<MovieSearchPage />);

    fireEvent.change(screen.getByPlaceholderText(/search for a movie/i), {
        target: { value: 'NonExistentMovie' },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => screen.getByText(/an error occurred/i));

    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
})