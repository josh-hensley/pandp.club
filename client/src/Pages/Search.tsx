import './Search.css'
import { useState } from 'react'
import { MovieCard } from '../Components';
import type { IMovie, IQueryResponse, IPageData } from '../Interfaces';

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

const Search = () => {
    const [search, setSearch] = useState("")
    const [movies, setMovies] = useState<IMovie[]>([])
    const [pageData, setPageData] = useState<IPageData>()
    const baseUrl = "https://api.themoviedb.org/3/search/movie?query="

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target
        setSearch(value)
    }

    const handleSearch = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}${search.split(' ').join('%2')}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${TMDB_KEY}`
            }
        });
        const data: IQueryResponse = await response.json();
        const { results, total_pages, total_results, page } = data;
        setMovies(results);
        setPageData({ total_pages, total_results, page })
    }

    const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (pageData) {
            const response = await fetch(`${baseUrl}${search.split(' ').join('%2')}&page=${pageData.page + 1}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${TMDB_KEY}`
                }
            });
            const data = await response.json();
            const { results, total_pages, total_results, page } = data;
            setMovies(results);
            setPageData({ total_pages, total_results, page })
            location.href = '#'
        }
    }

    const handleBack = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (pageData) {
            const response = await fetch(`${baseUrl}${search.split(' ').join('%2')}&page=${pageData.page - 1}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${TMDB_KEY}`
                }
            });
            const data = await response.json();
            const { results, total_pages, total_results, page } = data;
            setMovies(results);
            setPageData({ total_pages, total_results, page })
            location.href = '#'
        }
    }


    return (
        <div className="container">
            <form onSubmit={handleSearch}>
                <input type="text" id="searchbar" name="searchbar" value={search} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
            <div className="results">
                {movies.length > 0 ? movies.map(movie => <MovieCard movie={movie} key={movie.id} />) : <p>Search for a film to add to your queue!</p>}
            </div>
            {pageData?.page && (
                <div className="pages">
                    <p>Results: {pageData?.total_results}</p>
                    <p>Page: {pageData?.page}</p>
                    <div className="page-buttons">
                        {pageData.page > 1 && (<button type="button" onClick={handleBack}>Back</button>)}
                        {pageData.page < pageData.total_pages && (<button type="button" onClick={handleNext}>Next</button>)}
                    </div>
                </div>
            )}

        </div>
    )
}

export default Search