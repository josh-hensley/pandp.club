import type { IMovie } from "../Interfaces";

export const getMovie = async (id: number) : Promise<IMovie> => {
    const response = await fetch(`/tmdb/${id}`);
    const movie = await response.json()
    return movie
}