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

  const getUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    console.log(data)
    return data;
  }

  const getISOWeek = (date: Date) => {
    const d = new Date(date.getTime());
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
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
    const week = getISOWeek(currentDate);
    const users = await getUsers();
    console.log(users);
    const movieId = users[week % 1].queue[0]
    if (movieId) {
      const movie = await getMovie(movieId)
      setMovie({ selectedBy: users[week % 1].username, ...movie })
    }
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
