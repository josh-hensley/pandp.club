import './App.css'
import { useState, useEffect } from 'react';
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3/movie"

function App() {
  const bannerUrl = "./Pandp_banner.jpg";
  const currentDate = new Date();
  const [movie, setMovie] = useState({
    title: "",
    selectedBy: "",
    release_date: "",
    poster_path: "",
    overview: ""
  });

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user
  }

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

  const getFilmOfWeek = async () => {
    const response = await fetch('/api/filmOfWeek');
    const data = await response.json()
    setMovie(await getMovie(data.movieId));
  }

  useEffect(() => {
    const asyncCall = async () => {
      await getFilmOfWeek()
    }
    if (movie.title == "")
      asyncCall()
  })

  return (
    <main className="container">
      <h1>Popcorn and Paraphernalia</h1>
      <p className="welcome">Welcome, {getUser().username ? getUser().username : 'Guest'}</p>
      <img src={bannerUrl} />
      <h2>Film for the week of {currentDate.toDateString()}</h2>
      <h3>Selected by {movie.selectedBy}</h3>
      <h3>{movie.title}</h3>
      <p>Released {movie.release_date.split("-")[0]}</p> 
      <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
      <p>{movie.overview}</p>
      <div className="flex">
        <button type="button"><a href='/'>Join Discussion</a></button>
        <button type="button"><a href='/'>Past Films</a></button>
      </div>
    </main>
  )
}

export default App
