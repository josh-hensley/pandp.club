import "./App.css";
import Auth from "../utils/auth";
import { useState, useEffect } from "react";
import bannerUrl from "../assets/Pandp_banner.jpg";
import { getMovie } from "../services/getMovie";
import { getFilmOfWeek } from "../services/getFilmOfWeek";
import type { IMovie } from "../Interfaces";
import { MovieCard } from "../Components";

function App() {
  const currentDate = new Date();
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    const asyncCall = async () => {
      const data = await getFilmOfWeek();
      console.log(data)
      const movie = await getMovie(data.movieId);
      setMovie({ selectedBy: data.selectedBy, ...movie });
    };
    asyncCall();
  }, []);

  return (
    <main className="container">
      <h1>Popcorn and Paraphernalia</h1>
      <p className="welcome">
        Welcome, {Auth.loggedIn() ? Auth.getProfile().data.username : "Guest"}
      </p>
      <img src={bannerUrl} />
      <h2>Film for the week of {currentDate.toDateString()}</h2>
      <h3>Selected by {movie?.selectedBy}</h3>
      {movie && <MovieCard movie={movie} showDescription={true} />}
      <div className="flex">
        <button type="button">
          <a href="/past">Past Films</a>
        </button>
      </div>
    </main>
  );
}

export default App;
