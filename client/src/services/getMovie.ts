import type { IMovie } from "../Interfaces";

export const getMovie = async (id: number) : Promise<IMovie> => {
    const response = await fetch(`/api/tmdb/${id}`);
    const movie = await response.json()
    return movie
}