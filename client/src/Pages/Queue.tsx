import { useState, useEffect } from "react";
import { MovieCard } from "../Components"
import type { IMovie } from "../Interfaces";
import './Queue.css'
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3/movie"

const Queue = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [fetched, setFetched] = useState(false)

    const getUser = () => {
        return JSON.parse(localStorage.getItem('user') || '')
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
            const movieList = await Promise.all(getUser().queue.map((id: number) => getMovie(id)));
            setMovies(movieList);
            setFetched(true);
        }
        if (getUser().queue.length > 0 && !fetched) {
            fetchMovies();   
        }
    });

    return (
        <div className="container">
            <h2>Your Queue</h2>
            <div className="queue">
                {getUser().queue.length > 0 ? movies.map((movie) => {
                    return (
                            <MovieCard movie={movie} queueView key={movie.id} />
                    )
                }) : <p>Go to search to add movies to queue!</p>}
            </div>
        </div>
    )
}

export default Queue