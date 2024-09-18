const API_KEY = '2ea0748bf49491b676ebb6ff9069e5f1'; 
export const fetchWeather = async (capital: string) => {
 const response = await fetch(
   `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`
 );
 console.log("response data",response)
 if (!response.ok) throw new Error('Error fetching weather data');
 return response.json();
};