import type { IMovie } from "../Interfaces";
import { useState } from "react";

interface IMovieCardProps {
    movie: IMovie;
}

const MovieCard = (props: IMovieCardProps) => {
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

    return (
        <div className="card">
            <h3>{title}, {release_date.split('-')[0]}</h3>
            <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="" />
            {isInQueue ?
                <button type="button" onClick={handleRemoveFromQueue}>Remove From Queue</button> :
                <button type="button" onClick={handleAddToQueue}>Add to Queue</button>}

        </div>
    )
}

export default MovieCard