import Auth from "../utils/auth";
import { useState, useEffect } from "react";
import { MovieCard } from "../Components";
import type { IMovie, IUser } from "../Interfaces";
import { getMovie } from "../services/getMovie";
import { updateUserQueue } from "../services/updateUserQueue";

const Queue = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [fetched, setFetched] = useState(false);
  const [user, setUser] = useState<IUser>({ username: "", queue: [] });

  const isInQueue = (id: number) => {
    return user.queue.includes(id);
  };

  const isFirst = (id: number) => {
    return user.queue.indexOf(id) === 0;
  };

  const isLast = (id: number) => {
    return user.queue.indexOf(id) === user.queue.length - 1;
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await Auth.getUser();
      setUser(fetchedUser);
      const { queue } = fetchedUser;
      const fetchedMovies = Promise.all(
        queue.map((id: number) => getMovie(id)),
      );
      setMovies(await fetchedMovies);
      setFetched(true);
    };
    if (!fetched) {
      fetchData();
    }
  }, [fetched]);

  const handleMove = async (movieId: number, moveCount: number) => {
    const queue = [...user.queue];
    const newIndex = queue.indexOf(movieId) + moveCount;
    const current = queue.indexOf(movieId);
    const item = queue.splice(current, 1);
    queue.splice(newIndex, 0, item[0]);
    const data = await updateUserQueue(queue)
    setUser(data);
    setFetched(false);
  };

  const handleAddToQueue = async (id: number) => {
    const queue = [...user.queue, id];
    const data = await updateUserQueue(queue)
    setUser({ ...data });
    setFetched(false)
  };

  const handleRemoveFromQueue = async (id: number) => {
    const queue = user.queue.filter((item: number) => item != id);
    const data = await updateUserQueue(queue)
    setUser(data);
    setFetched(false);
  };

  return (
    <div className="container">
      <h2>{user?.username}'s Queue</h2>
      <div className="queue">
        {Auth.loggedIn() && movies ? (
          movies.map((movie) => {
            return (
              <div className="card-container" key={movie.id}>
                <MovieCard movie={movie} showDescription={false} />
                <div className="button-container">
                  {isInQueue(movie.id) ? (
                    <button
                      type="button"
                      onClick={() => handleRemoveFromQueue(movie.id)}
                    >
                      Remove From Queue
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAddToQueue(movie.id)}
                    >
                      Add to Queue
                    </button>
                  )}
                  {!isFirst(movie.id) && (
                    <button
                      type="button"
                      onClick={() => handleMove(movie.id, -1)}
                      data-movie-id={movie.id}
                    >
                      Move Up
                    </button>
                  )}
                  {!isLast(movie.id) && (
                    <button
                      type="button"
                      onClick={() => handleMove(movie.id, 1)}
                      data-movie-id={movie.id}
                    >
                      Move Down
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>Go to search to add movies to queue!</p>
        )}
      </div>
    </div>
  );
};

export default Queue;
