export const TMDB_API_KEY = process.env.VITE_TMDB_API_KEY;
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const ENDPOINTS = {
  trending: '/trending/all/week',
  netflixOriginals: '/discover/tv?with_networks=213',
  topRated: '/movie/top_rated',
  actionMovies: '/discover/movie?with_genres=28',
  comedyMovies: '/discover/movie?with_genres=35',
  horrorMovies: '/discover/movie?with_genres=27',
  romanceMovies: '/discover/movie?with_genres=10749',
  documentaries: '/discover/movie?with_genres=99',
};

export const IMAGE_SIZES = {
  poster: '/w500',
  backdrop: '/original',
};

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
} 