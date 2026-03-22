import Auth from "../utils/auth";
import { useState, useEffect } from "react";
import { MovieCard } from "../Components"
import type { IMovie, IUser } from "../Interfaces";
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3/movie"

const Queue = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [fetched, setFetched] = useState(false);
    const [user, setUser] = useState<IUser>({ username: "", queue: [] })

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

    const isInQueue = (id: number)=>{
        return user.queue.includes(id)
    }

    const isFirst = (id:number) => {
        return user.queue.indexOf(id) === 0
    }

    const isLast = (id:number) => {
        return user.queue.indexOf(id) === user.queue.length - 1
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchedUser = await Auth.getUser();
            setUser({ ...fetchedUser })
            const { queue } = fetchedUser;
            const fetchedMovies = Promise.all(queue.map((id: number) => getMovie(id)))
            setMovies(await fetchedMovies)
            setFetched(true);
        }
        if (!fetched) {
            fetchData();
        }
    }, [fetched]);

    const handleMoveUp = async (id: number) => {
        const queue = [...user.queue]
        const prev = queue.indexOf(id) - 1
        const current = queue.indexOf(id)
        const item = queue.splice(current, 1)
        queue.splice(prev, 0, item[0])
        await fetch(`/api/user/${user.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user, queue })
        });
        setUser({ ...user, queue })
        setFetched(false)
    }

    const handleMoveDown = async (id: number) => {
        const queue = [...user.queue]
        const next = queue.indexOf(id) + 1
        const current = queue.indexOf(id)
        const item = queue.splice(current, 1)
        queue.splice(next, 0, item[0])
        await fetch(`/api/user/${user.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user, queue })
        });
        setUser({ ...user, queue })
        setFetched(false)
    }

    const handleAddToQueue = async (id: number) => {
        const queue = [...user.queue, id]
        const response = await fetch(`/api/user/${user.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user, queue })
        });
        const data = await response.json()
        setUser({ ...data })
    }

    const handleRemoveFromQueue = async (id: number) => {
        const queue = user.queue.filter((item: number) => item != id);
        const response = await fetch(`/api/user/${user?.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user, queue })
        });
        const data = await response.json()
        setUser({ ...data })
    }

    return (
        <div className="container">
            <h2>{user.username}'s Queue</h2>
            <div className="queue">
                {Auth.loggedIn() && movies ? movies.map((movie) => {
                    return (
                        <div className="card-container" key={movie.id}>
                            <MovieCard movie={movie} />
                            <div className="button-container">
                                {isInQueue(movie.id) ? <button type="button" onClick={() => handleRemoveFromQueue(movie.id)}>Remove From Queue</button>:
                                <button type="button" onClick={() => handleAddToQueue(movie.id)}>Add to Queue</button>}
                                {!isFirst(movie.id) && <button type="button" onClick={() => handleMoveUp(movie.id)} data-movie-id={movie.id}>Move Up</button>}
                                {!isLast(movie.id) && <button type="button" onClick={() => handleMoveDown(movie.id)} data-movie-id={movie.id}>Move Down</button>}
                            </div>
                        </div>
                    )
                }) : <p>Go to search to add movies to queue!</p>}
            </div>
        </div>
    )
}

export default Queue