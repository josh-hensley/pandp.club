import type { IMovie } from "../Interfaces";
import { useState } from "react";

interface IMovieCardProps {
    movie: IMovie;
    queueView?: boolean;
}

const MovieCard = (props: IMovieCardProps) => {
    const { queueView } = props || false
    const { id, title, release_date, poster_path } = props.movie;
    const [isInQueue, setIsInQueue] = useState(JSON.parse(localStorage.getItem('queue') || '[]').includes(id))

    const handleAddToQueue = () => {
        const queue = JSON.parse(localStorage.getItem('queue') || '[]')
        queue.push(id)
        localStorage.setItem('queue', JSON.stringify(queue))
        setIsInQueue(true)
    }

    const handleRemoveFromQueue = () => {
        const queue = JSON.parse(localStorage.getItem('queue') || '[]');
        const filteredQueue = queue.filter((item: number) => item != id);
        localStorage.setItem('queue', JSON.stringify(filteredQueue))
        setIsInQueue(false);
    }

const handleMoveUp = () => {
    const queue = JSON.parse(localStorage.getItem('queue') || '[]');
    const prev = queue.indexOf(id) - 1
    const current = queue.indexOf(id)
    const item = queue.splice(current, 1)
    queue.splice(prev, 0, item)
    localStorage.setItem('queue', JSON.stringify(queue))
}

const handleMoveDown = () => {
    const queue = JSON.parse(localStorage.getItem('queue') || '[]');
    const next = queue.indexOf(id) + 1
    const current = queue.indexOf(id)
    const item = queue.splice(current, 1)
    queue.splice(next, 0, item)
    localStorage.setItem('queue', JSON.stringify(queue))
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