'use client'
import { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard'; // Corrected import
import WeatherModal from '../components/WeatherModal';
import { fetchCountries } from '../services/countryService';
import { fetchWeather } from '../services/weatherService';
import '../styles/global.css';

interface Country {
 name: string;
 flag: string;
 capital: string;
 region: string;
 alpha3Code: string;
}

const HomePage = () => {
 const [countries, setCountries] = useState<Country[]>([]);
 const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
 const [weatherData, setWeatherData] = useState<any>(null);
 const [isModalOpen, setIsModalOpen] = useState(false);

 useEffect(() => {
   fetchCountries()
     .then(data => {
       console.log('Fetched countries:', data); 
       setCountries(data);
     })
     .catch(error => {
       console.error('Error fetching countries:', error);
     });
 }, []);

 const handleWeatherClick = async (country: Country) => {
   try {
     const data = await fetchWeather(country.capital);
     setWeatherData(data);
     setSelectedCountry(country);
     setIsModalOpen(true);
   } catch (error) {
     console.error('Error fetching weather data:', error);
   }
 };

 const closeModal = () => {
   setIsModalOpen(false);
   setSelectedCountry(null);
 };

 return (
   <div className="country-grid">
     {countries.map((country) => (
       <CountryCard
         key={country.alpha3Code}
         name={country.name}
         flag={country.flag}
         capital={country.capital}
         region={country.region}
         countryCode={country.alpha3Code}
         onClick={() => handleWeatherClick(country)}
       />
     ))}
     {selectedCountry && (
       <WeatherModal
         isOpen={isModalOpen}
         onRequestClose={closeModal}
         weatherData={weatherData}
       />
     )}
   </div>
 );
};

export default HomePage;