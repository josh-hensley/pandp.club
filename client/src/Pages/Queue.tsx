import { useState, useEffect } from "react";
import { MovieCard } from "../Components"
import type { IMovie } from "../Interfaces";
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3/movie"

const Queue = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);

    const getIds = () => {
        return JSON.parse(localStorage.getItem('queue') || '[]')
    }
    
    const getMovie = async (id: number) => {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${TMDB_KEY}`
            }
        });
        const movie = await response.json()
        return movie
    }

    useEffect(() => {
        const fetchMovies = async () => {
            const movieList = await Promise.all(getIds().map((id: number) => getMovie(id)));
            setMovies(movieList);
        }
        if (getIds().length > 0) {
            fetchMovies();
        }
    });

    return (
        <div className="container">
            <h2>Your Queue</h2>
            <div className="queue">
                {getIds().length > 0 ? movies.map((movie) => {
                    return (
                            <MovieCard movie={movie} queueView key={movie.id} />
                    )
                }) : <p>Go to search to add movies to queue!</p>}
            </div>
        </div>
    )
}

export default Queue