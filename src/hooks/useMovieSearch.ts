import { useState } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface UseMovieSearchResult {
  movies: Movie[];
  error: string | null;
  loading: boolean;
  searchMovies: () => void;
}

const useMovieSearch = (query: string): UseMovieSearchResult => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const searchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
              query,
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    return { movies, error, loading, searchMovies };
};

export default useMovieSearch;