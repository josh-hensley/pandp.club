import { useEffect, useState } from 'react'
import Auth from '../utils/auth';
import { MovieCard } from '../Components';
import { getSearchResults } from '../services/getSearchResults';
import { updateUserQueue } from '../services/updateUserQueue';
import type { IMovie, IPageData, IUser } from '../Interfaces';

const Search = () => {
    const [search, setSearch] = useState("")
    const [movies, setMovies] = useState<IMovie[]>([])
    const [pageData, setPageData] = useState<IPageData>()
    const [user, setUser] = useState<IUser>({ username: "", queue: [] })

    useEffect(() => {
        const asyncCall = async () => {
            const user = await Auth.getUser();
            setUser(user)
        }
        asyncCall()
    }, [movies, user])

    const isInQueue = (id: number) => {
        return user.queue.length > 0 ? user?.queue.includes(id) : false;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target
        setSearch(value)
    }

    const handleSearch = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const { results, total_pages, total_results, page } = await getSearchResults(search.split(' ').join('%20'))
        setMovies(results);
        setPageData({ total_pages, total_results, page })
    }

    const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (pageData) {
            const { results, total_pages, total_results, page } = await getSearchResults(search.split(' ').join('%20'), pageData.page + 1)
            setMovies(results);
            setPageData({ total_pages, total_results, page })
            location.href = '#'
        }
    }

    const handleBack = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (pageData) {
            const { results, total_pages, total_results, page } = await getSearchResults(search.split(' ').join('%20'), pageData.page - 1)
            setMovies(results);
            setPageData({ total_pages, total_results, page })
            location.href = '#'
        }
    }

    const handleAddToQueue = async (id: number) => {
        const queue = [...user.queue, id]
        const data = await updateUserQueue(queue)
        setUser(data)
    }

    const handleRemoveFromQueue = async (id: number) => {
        const queue = user.queue.filter((item: number) => item != id);
        const data = await updateUserQueue(queue)
        setUser(data)
    }


    return (
        <div className="container">
            <form onSubmit={handleSearch}>
                <input type="text" id="searchbar" name="searchbar" value={search} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
            <div className="results">
                {movies.length > 0 ? movies.map(movie => {
                    return (
                        <div className="card-container" key={movie.id}>
                            <MovieCard movie={movie} showDescription={false} />
                            {isInQueue(movie.id) ? <button type="button" onClick={() => handleRemoveFromQueue(movie.id)}>Remove From Queue</button> :
                                <button type="button" onClick={() => handleAddToQueue(movie.id)}>Add to Queue</button>
                            }
                        </div>
                    )
                }) : <p>Search for a film to add to your queue!</p>}

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