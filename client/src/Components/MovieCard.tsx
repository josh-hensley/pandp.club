import type { IMovie } from "../Interfaces";

interface IMovieCardProps {
    movie: IMovie;
}

const MovieCard = (props: IMovieCardProps) => {
    const { title, release_date, poster_path } = props.movie;

    return (
        <div className="card">
            <h3>{title}, {release_date && release_date?.split('-')[0]}</h3>
            <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="" />
        </div>
    )
}

export default MovieCard