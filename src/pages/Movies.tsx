import MovieRow from '../components/MovieRow';

const Movies = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="px-4">
        <h1 className="text-white text-4xl font-bold mb-8">Movies</h1>
        <MovieRow title="Popular Movies" endpoint="topRated" />
        <MovieRow title="Action Movies" endpoint="actionMovies" />
        <MovieRow title="Comedy Movies" endpoint="comedyMovies" />
        <MovieRow title="Horror Movies" endpoint="horrorMovies" />
        <MovieRow title="Romance Movies" endpoint="romanceMovies" />
        <MovieRow title="Documentaries" endpoint="documentaries" />
      </div>
    </div>
  );
};

export default Movies; 