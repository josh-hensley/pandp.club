export const getFilmOfWeek = async () => {
  const response = await fetch("/api/films/current");
  const data = await response.json();
  return data;
};
