import { useEffect, useState } from "react";
import { MovieCard } from "../Components";
import type { IMovie, ISelection } from "../Interfaces";
import { getMovie } from "../services/getMovie";

const Past = () => {
  const [movies, setMovies] = useState<IMovie[]>();

  useEffect(() => {
    const asyncCall = async () => {
      const response = await fetch("/api/films");
      const data = await response.json();
      const fetchedMovies = await Promise.all(
        data.map(async (selection: ISelection): Promise<IMovie> => {
          const movie = await getMovie(selection.movieId);
          return { ...movie, selectedBy: selection.selectedBy };
        }),
      );
       setMovies(await fetchedMovies);
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
