import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { PlayIcon, PlusIcon, HandThumbUpIcon, HandThumbDownIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { Movie } from '../services/api.config';
import { fetchMovies, getImageUrl } from '../services/movieService';

interface MovieRowProps {
  title: string;
  endpoint: string;
  onMovieClick?: (movie: Movie) => void;
}

const MovieRow = ({ title, endpoint, onMovieClick }: MovieRowProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(endpoint as any);
        setMovies(data);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [endpoint]);

  const handleScroll = useCallback((direction: 'left' | 'right') => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = slider.clientWidth * 0.75;
    const newScrollLeft = direction === 'left' 
      ? slider.scrollLeft - scrollAmount 
      : slider.scrollLeft + scrollAmount;

    slider.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  }, []);

  const handleSliderScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const isAtStart = slider.scrollLeft === 0;
    const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1;

    setShowLeftArrow(!isAtStart);
    setShowRightArrow(!isAtEnd);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    setDragStartTime(Date.now());
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = (_e: React.MouseEvent<HTMLDivElement>, movie: Movie) => {
    setIsDragging(false);
    if (Date.now() - dragStartTime < 150 && onMovieClick) {
      onMovieClick(movie);
    }
  };

  const handleMouseEnter = (movie: Movie) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMovie(movie);
      setIsVideoPlaying(true);
    }, 800);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredMovie(null);
    setIsVideoPlaying(false);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleSliderScroll);
      handleSliderScroll();
    }

    return () => {
      if (slider) {
        slider.removeEventListener('scroll', handleSliderScroll);
      }
    };
  }, [movies, handleSliderScroll]);

  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-white text-xl md:text-2xl font-bold mb-4 px-4 md:px-[60px]">{title}</h2>
        <div className="flex space-x-2 md:space-x-4 px-4 md:px-[60px]">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex-none w-[140px] md:w-[160px] h-[200px] md:h-[240px] bg-netflix-gray/20 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="group/row mb-8">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4 px-4 md:px-[60px]">{title}</h2>
      <div className="relative">
        {showLeftArrow && (
          <button
            className="absolute left-0 top-0 bottom-0 z-50 flex items-center justify-center w-10 md:w-14 bg-black/50 opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeftIcon className="h-6 md:h-8 w-6 md:w-8 text-white" />
          </button>
        )}

        <div className="relative px-4 md:px-[60px] -mx-4 md:-mx-[60px] overflow-hidden">
          <div
            ref={sliderRef}
            className={`flex gap-2 overflow-x-scroll scroll-smooth scrollbar-hide ${
              isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsDragging(false)}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex-none w-[140px] md:w-[160px] group/item relative"
                draggable={false}
                onMouseUp={(e) => handleMouseUp(e, movie)}
                onMouseEnter={() => handleMouseEnter(movie)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative h-[200px] md:h-[240px] rounded-lg overflow-hidden transition-all duration-300 group-hover/item:scale-110 group-hover/item:z-50 group-hover/item:shadow-xl">
                  {hoveredMovie?.id === movie.id && isVideoPlaying ? (
                    <video
                      className="w-full h-full object-cover transform scale-105 transition-transform duration-300"
                      autoPlay
                      muted
                      loop
                      src="/test-video.mp4"
                    />
                  ) : (
                    <img
                      src={getImageUrl(movie.poster_path)}
                      alt={movie.title || movie.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover/item:scale-105"
                      draggable={false}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quick Actions Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent transform translate-y-full group-hover/item:translate-y-0 transition-transform duration-300">
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mb-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 delay-100">
                      <button 
                        className="flex items-center justify-center bg-white rounded-full p-1.5 hover:bg-white/80 transition-all duration-300 hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle play action
                        }}
                      >
                        <PlayIcon className="h-4 w-4 text-black" />
                      </button>
                      <button 
                        className="flex items-center justify-center border-2 border-white/40 rounded-full p-1.5 hover:border-white hover:scale-110 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle add to list
                        }}
                      >
                        <PlusIcon className="h-4 w-4 text-white" />
                      </button>
                      <button 
                        className="flex items-center justify-center border-2 border-white/40 rounded-full p-1.5 hover:border-white hover:scale-110 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle like
                        }}
                      >
                        <HandThumbUpIcon className="h-4 w-4 text-white" />
                      </button>
                      <button 
                        className="flex items-center justify-center border-2 border-white/40 rounded-full p-1.5 hover:border-white hover:scale-110 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle dislike
                        }}
                      >
                        <HandThumbDownIcon className="h-4 w-4 text-white" />
                      </button>
                    </div>

                    {/* Movie Info */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white mb-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 delay-150">
                      <span className="text-green-500 font-semibold">
                        {Math.round(movie.vote_average * 10)}% Match
                      </span>
                      <span className="border border-white/40 px-1">HD</span>
                      {movie.release_date && (
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                      )}
                    </div>

                    {/* Title and Overview */}
                    <div className="space-y-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 delay-200">
                      <p className="text-white text-sm font-semibold">
                        {movie.title || movie.name}
                      </p>
                      <p className="text-gray-300 text-xs line-clamp-2">
                        {movie.overview}
                      </p>
                    </div>

                    {/* More Info Button */}
                    <button 
                      className="absolute bottom-4 right-4 flex items-center justify-center bg-[#2F2F2F]/60 hover:bg-[#2F2F2F] rounded-full p-1.5 transition-all duration-300 opacity-0 group-hover/item:opacity-100 hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMovieClick?.(movie);
                      }}
                    >
                      <InformationCircleIcon className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showRightArrow && (
          <button
            className="absolute right-0 top-0 bottom-0 z-50 flex items-center justify-center w-10 md:w-14 bg-black/50 opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"
            onClick={() => handleScroll('right')}
          >
            <ChevronRightIcon className="h-6 md:h-8 w-6 md:w-8 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRow; 