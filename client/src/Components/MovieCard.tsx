import type { IMovie } from "../Interfaces";
import { getTMDBImage } from "../services/getTMDBImage";

interface IMovieCardProps {
    movie: IMovie;
    showDescription: boolean;
}

const MovieCard = (props: IMovieCardProps) => {
    const { title, release_date, poster_path, overview } = props.movie;
    const releaseYear = new Date(release_date).getFullYear().toString()

    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{release_date && "Released " + releaseYear}</p>
            <img src={getTMDBImage(poster_path as string)} />
            {props.showDescription && <p>{overview}</p>}
        </div>
    )
}

export default MovieCard