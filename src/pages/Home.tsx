import { useState, useEffect } from 'react';
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import MovieRow from '../components/MovieRow';
import MovieModal from '../components/MovieModal';
import { Movie } from '../services/api.config';
import { fetchNetflixOriginals, getImageUrl } from '../services/movieService';

const Home = () => {
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const loadHeroMovie = async () => {
      try {
        const movies = await fetchNetflixOriginals();
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setHeroMovie(randomMovie);
      } catch (error) {
        console.error('Error loading hero movie:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHeroMovie();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-netflix-black animate-pulse" />
    );
  }

  return (
    <div className="relative min-h-screen bg-netflix-black overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[56.25vw] max-h-[95vh] min-h-[400px] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-netflix-black/60 to-netflix-black z-10" />
        {heroMovie && (
          <img
            src={getImageUrl(heroMovie.backdrop_path, 'backdrop')}
            alt={heroMovie.title || heroMovie.name}
            className="w-full h-full object-cover"
          />
        )}
        
        <div className="absolute top-[35%] sm:top-[30%] left-4 md:left-[60px] z-20 max-w-[80%] sm:max-w-[70%] md:max-w-[50%]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">
            {heroMovie?.title || heroMovie?.name}
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg line-clamp-3 md:line-clamp-4 mb-4 md:mb-6">
            {heroMovie?.overview}
          </p>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center bg-white text-black px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded font-semibold hover:bg-white/80 transition min-w-[100px]">
              <PlayIcon className="h-5 w-5 mr-1 sm:mr-2" />
              <span>Play</span>
            </button>
            <button 
              className="flex items-center justify-center bg-gray-500/70 text-white px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded font-semibold hover:bg-gray-500/50 transition min-w-[130px]"
              onClick={() => heroMovie && setSelectedMovie(heroMovie)}
            >
              <InformationCircleIcon className="h-5 w-5 mr-1 sm:mr-2" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Movie Rows */}
      <div className="relative z-20 -mt-32 md:-mt-40">
        <MovieRow 
          title="Trending Now" 
          endpoint="trending" 
          onMovieClick={setSelectedMovie}
        />
        <MovieRow 
          title="Netflix Originals" 
          endpoint="netflixOriginals" 
          onMovieClick={setSelectedMovie}
        />
        <MovieRow 
          title="Top Rated" 
          endpoint="topRated" 
          onMovieClick={setSelectedMovie}
        />
        <MovieRow 
          title="Action Movies" 
          endpoint="actionMovies" 
          onMovieClick={setSelectedMovie}
        />
        <MovieRow 
          title="Comedy Movies" 
          endpoint="comedyMovies" 
          onMovieClick={setSelectedMovie}
        />
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default Home; 