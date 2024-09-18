export const fetchWeather = async (capital: string) => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const weatherApiUrl = process.env.NEXT_PUBLIC_WEATHER_API_URL;
    const response = await fetch(
      `${weatherApiUrl}?q=${capital}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error('Error fetching weather data');
    return response.json();
   };