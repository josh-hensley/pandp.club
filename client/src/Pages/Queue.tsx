import Auth from "../utils/auth";
import { useState, useEffect } from "react";
import { MovieCard } from "../Components"
import type { IMovie, IUser } from "../Interfaces";
import './Queue.css'
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3/movie"

const Queue = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [fetched, setFetched] = useState(false);
    const [user, setUser] = useState<IUser>({
        username: "Guest",
        queue: []
    })

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

    const getUser = async () => {
        const username = Auth.getProfile().data.username
        const response = await fetch(`/api/user/${username}`)
        const user: IUser = await response.json()
        setUser(user);
    }

    useEffect(() => {
        const fetchMovies = async () => {
            await getUser();
            const movieList = await Promise.all(user.queue.map((id: number) => getMovie(id)));
            setMovies(movieList);
            setFetched(true);
        }
        if (Auth.loggedIn() && !fetched) {
            fetchMovies();
        }
    });

    return (
        <div className="container">
            <h2>Your Queue</h2>
            <div className="queue">
                {Auth.loggedIn() && user.queue.length > 0 ? movies.map((movie) => {
                    return (
                        <MovieCard movie={movie} queueView key={movie.id} />
                    )
                }) : <p>Go to search to add movies to queue!</p>}
            </div>
        </div>
    )
}

export default Queue