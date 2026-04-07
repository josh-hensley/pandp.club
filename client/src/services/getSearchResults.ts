export const getSearchResults = async (query: string, page = 1) => {
  try {
    const response = await fetch(`/api/tmdb?query=${query}&page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error)
  }
};
