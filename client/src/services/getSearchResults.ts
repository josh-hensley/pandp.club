export const getSearchResults = async (query: string, page=1)=>{
    const response = await fetch(`/tmdb?query=${query}&page=${page}`);
    const data = await response.json()
    return data;
}