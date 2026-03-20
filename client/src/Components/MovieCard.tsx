import Auth from "../utils/auth";
import type { IMovie, IUser } from "../Interfaces";
import { useState, useEffect } from "react";

interface IMovieCardProps {
    movie: IMovie;
    queueView?: boolean;
}

const MovieCard = (props: IMovieCardProps) => {
    const { id, title, release_date, poster_path } = props.movie;
    const [user, setUser] = useState<IUser>({username: "", queue: []})
    const [isInQueue, setIsInQueue] = useState(true)

    useEffect(()=>{
        const asyncCall = async () => {
            setUser(await Auth.getUser())
        }
        asyncCall();
    })

    const handleAddToQueue = async () => {
        const queue = [...user.queue, id]
        const response = await fetch(`/api/user/${user.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user, queue })
        });
        const data = await response.json()
        setUser({...data})
        setIsInQueue(true)
    }

    const handleRemoveFromQueue = async () => {
        const queue = user.queue.filter((item: number) => item != id);
        const response = await fetch(`/api/user/${user?.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user, queue })
        });
        const data = await response.json()
        setUser({...data})
        setIsInQueue(false);
    }

    return (
        <div className="card">
            <h3>{title}, {release_date && release_date?.split('-')[0]}</h3>
            <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="" />
            {isInQueue ?
                <button type="button" onClick={handleRemoveFromQueue}>Remove From Queue</button> :
                <button type="button" onClick={handleAddToQueue}>Add to Queue</button>}
        </div>
    )
}

export default MovieCard