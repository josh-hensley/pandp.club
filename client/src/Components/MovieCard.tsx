import type { IMovie } from "../Interfaces";
import { useState } from "react";

interface IMovieCardProps {
    movie: IMovie;
    queueView?: boolean;
}

const MovieCard = (props: IMovieCardProps) => {
    const { queueView } = props || false
    const { id, title, release_date, poster_path } = props.movie;
    const [isInQueue, setIsInQueue] = useState(JSON.parse(localStorage.getItem('user') || '[]').queue.includes(id))

    const getUser = () => {
        const user = JSON.parse(localStorage.getItem('user') || 'Guest')
        return user;
    }

    const handleAddToQueue = async () => {
        const user = getUser();
        user.queue.push(id)
        const response = await fetch(`/api/user/${getUser().username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user })
        });
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(user))
        console.log(data)
        setIsInQueue(true)
    }

    const handleRemoveFromQueue = async () => {
        const user = getUser();
        const filteredQueue = user.queue.filter((item: number) => item != id);
        user.queue = filteredQueue;
        const response = await fetch(`/api/user/${getUser().username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user })
        });
        const data = await response.json();
        console.log(data)
        localStorage.setItem('user', JSON.stringify(user));
        setIsInQueue(false);
    }

    const handleMoveUp = async () => {
        const user = getUser();
        const prev = user.queue.indexOf(id) - 1
        const current = user.queue.indexOf(id)
        const item = user.queue.splice(current, 1)
        user.queue.splice(prev, 0, item)
        const response = await fetch(`/api/user/${getUser().username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user })
        });
        const data = await response.json();
        console.log(data)
        localStorage.setItem('user', JSON.stringify(user))
    }

    const handleMoveDown = async () => {
        const user = getUser();
        const next = user.queue.indexOf(id) + 1
        const current = user.queue.indexOf(id)
        const item = user.queue.splice(current, 1)
        user.queue.splice(next, 0, item)
        const response = await fetch(`/api/user/${getUser().username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user })
        });
        const data = await response.json();
        console.log(data)
        localStorage.setItem('user', JSON.stringify(user))
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