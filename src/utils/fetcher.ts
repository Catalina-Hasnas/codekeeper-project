export const root = "https://images-api.nasa.gov";

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
