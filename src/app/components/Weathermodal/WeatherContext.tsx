'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchCountries } from '@/app/services/countryService';
import { fetchWeather } from '@/app/services/weatherService'
import Loading from '../loader/loading';
interface Country {
 name: string;
 flag: string;
 capital: string;
 region: string;
 alpha3Code: string;
}
interface WeatherContextProps {
 countries: Country[];
 selectedCountry: Country | null;
 weatherData: any;
 isModalOpen: boolean;
 setSelectedCountry: (country: Country | null) => void;
 setIsModalOpen: (isOpen: boolean) => void;
 handleWeatherClick: (country: Country) => void;
}
const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);
export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [countries, setCountries] = useState<Country[]>([]);
 const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
 const [weatherData, setWeatherData] = useState<any>(null);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isloading, setIsLoading] = useState(true); // Add a loading state
 useEffect(() => {
   fetchCountries()
     .then(setCountries)
     .catch(console.error)
     .finally(()=>{
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
     })
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

 if (isloading) {
  return <Loading />
 }

 
 return (

<WeatherContext.Provider
     value={{
       countries,
       selectedCountry,
       weatherData,
       isModalOpen,
       setSelectedCountry,
       setIsModalOpen,
       handleWeatherClick,
     }}
>
     {children}
</WeatherContext.Provider>
 );
};
export const useWeatherContext = () => {
 const context = useContext(WeatherContext);
 if (!context) {
   throw new Error('useWeatherContext must be used within a WeatherProvider');
 }
 
 return context;
};