import { useEffect, useState } from "react";
import { MovieCard } from "../Components";
import type { IMovie } from "../Interfaces";
import { getPastFilms } from "../services/getPastFilms";

const Past = () => {
  const [movies, setMovies] = useState<IMovie[]>();

  useEffect(() => {
    const asyncCall = async () => {
       setMovies(await getPastFilms());
    };
    asyncCall();
  }, []);

  return (
    <div className="container">
      <h2>Past Films</h2>
      <div className="results">
        {movies?.map((movie: IMovie) => {
          return <MovieCard movie={movie} showDescription key={movie.id} />;
        })}
      </div>
    </div>
  );
};

export default Past;
