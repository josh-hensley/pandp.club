import Auth from "../utils/auth";
import type { IMovie, IUser } from "../Interfaces";
import { useState, useEffect } from "react";

interface IMovieCardProps {
    movie: IMovie;
    queueView?: boolean;
}

const MovieCard = (props: IMovieCardProps) => {
    const { queueView } = props || false
    const { id, title, release_date, poster_path } = props.movie;
    const [user, setUser] = useState<IUser>({username: "", queue: []})
    const [isInQueue, setIsInQueue] = useState(JSON.parse(localStorage.getItem('user') || '[]').queue.includes(id))

    useEffect(()=>{
        const asyncCall = async () => {
            setUser((await Auth.getUser()))
        }
        asyncCall();
    }, [])

    const handleAddToQueue = async () => {
        const queue = [...user.queue, id]
        setUser({ ...user, queue })
        await fetch(`/api/user/${user.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user })
        });
        setIsInQueue(true)
    }

    const handleRemoveFromQueue = async () => {
        const queue = user.queue.filter((item: number) => item != id);
        setUser({ ...user, queue });
        await fetch(`/api/user/${user?.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user })
        });
        setIsInQueue(false);
    }

    const handleMoveUp = async () => {
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
            body: JSON.stringify({ ...user })
        });
        setUser({...user, queue})
    }

    const handleMoveDown = async () => {
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
            body: JSON.stringify({ ...user })
        });
        setUser({...user, queue})
    }

    return (
        <div className="card">
            <h3>{title}, {release_date && release_date?.split('-')[0]}</h3>
            <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="" />
            {isInQueue ?
                <button type="button" onClick={handleRemoveFromQueue}>Remove From Queue</button> :
                <button type="button" onClick={handleAddToQueue}>Add to Queue</button>}
            {queueView &&
                <div>
                    <button type="button" onClick={handleMoveUp} value={-1}>Move Up</button>
                    <button type="button" onClick={handleMoveDown} value={1}>Move Down</button>
                </div>
            }


        </div>
    )
}

export default MovieCard