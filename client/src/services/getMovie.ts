import type { IMovie } from "../Interfaces";

const TMDB_BASE = import.meta.env.VITE_BASE_TMDB_ROOT;
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

export const getMovie = async (id: number) : Promise<IMovie> => {
    const response = await fetch(`${TMDB_BASE}/movie/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${TMDB_KEY}`
        }
    });
    const movie = await response.json()
    return movie
}