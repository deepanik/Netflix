import { XMarkIcon, PlayIcon } from '@heroicons/react/24/solid';
import { Movie } from '../services/api.config';
import { getImageUrl } from '../services/movieService';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-black/70 transition-opacity"
          onClick={onClose}
        />

        <div className="relative inline-block w-full max-w-4xl text-left align-middle transition-all sm:my-8">
          <div className="relative bg-[#181818] rounded-lg shadow-xl">
            {/* Close button */}
            <button
              className="absolute right-4 top-4 z-10 rounded-full bg-[#181818] p-2 hover:bg-[#303030] transition-colors"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>

            {/* Hero Image */}
            <div className="relative aspect-video">
              <img
                src={getImageUrl(movie.backdrop_path, 'backdrop')}
                alt={movie.title || movie.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#181818]/60 to-[#181818]" />
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                  {movie.title || movie.name}
                </h2>
                <div className="flex items-center gap-4">
                  <button className="flex items-center justify-center bg-white text-black px-8 py-2 rounded font-semibold hover:bg-white/80 transition min-w-[100px]">
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Play
                  </button>
                </div>
              </div>
            </div>

            {/* Movie Details */}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 text-sm text-white mb-4">
                <span className="text-green-500 font-semibold">
                  {Math.round(movie.vote_average * 10)}% Match
                </span>
                <span>{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}</span>
              </div>

              <p className="text-white text-sm md:text-base mb-6">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal; 