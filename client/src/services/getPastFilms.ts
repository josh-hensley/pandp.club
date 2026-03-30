import type { ISelection, IMovie } from "../Interfaces";
import { getMovie } from "./getMovie";

export const getPastFilms = async () => {
  const response = await fetch("/api/films");
  const data = await response.json();
  const films = await Promise.all(
    data.map(async (selection: ISelection): Promise<IMovie> => {
      const movie = await getMovie(selection.movieId);
      return { ...movie, selectedBy: selection.selectedBy };
    }),
  );
  return films;
};
