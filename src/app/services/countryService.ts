export const fetchCountries = async () => {
    const countriesApiUrl = process.env.NEXT_PUBLIC_COUNTRIES_API_URL;
    if (!countriesApiUrl) {
      throw new Error("Countries API URL is not defined in the environment variables.");
    }
    const response = await fetch(countriesApiUrl);
    if (!response.ok) {
      throw new Error("Error fetching country data");
    }
    return response.json();
   };
   