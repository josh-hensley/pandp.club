import './App.css'

function App() {
  const movie = {
    img: "https://image.tmdb.org/t/p/original/orY4PX3TNFdCbdVwhKY32UKMvoA.jpg",
    year: 2005,
    overview: "This is a short overview."
  };

  const bannerUrl = "https://cdn.discordapp.com/attachments/1473899104630214778/1477865454574764062/Untitled_Artwork.jpg?ex=69a6f9b5&is=69a5a835&hm=56c28397f45e44d7660018e784c3956b18719e88beba7bfe543454d2ed198eef&";
  const currentWeek = new Date().toLocaleDateString();

  return (
    <main className='container'>
      <h1>Popcorn and Paraphernalia</h1>
      <p className="welcome">Welcome back, NAME</p>
      <img src={bannerUrl} />
      <h2>Film for the week of {currentWeek}</h2>
      <h3>Selected by NAME</h3>
      <h3>"Film Title"</h3>
      <p>Released {movie.year}</p>
      <img src={movie.img} />
      <p>{movie.overview}</p>
      <div className="container">
        <button type="button"><a href='/'>Join Discussion</a></button>
        <button type="button"><a href='/'>Past Films</a></button>
      </div>
    </main>
  )
}

export default App
