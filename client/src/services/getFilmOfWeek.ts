export const getFilmOfWeek = async () => {
  const response = await fetch("/api/filmOfWeek");
  const data = await response.json();
  return data;
};
