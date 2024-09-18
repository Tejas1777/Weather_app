export const fetchCountries = async () => {
  const response = await fetch("https://restcountries.com/v2/all");
  if (!response.ok) 
    throw new Error("Error fetching country data");
  return response.json();
};
