'use client'
import React, { useEffect, useState } from 'react';
import CountryCard from './components/Countrycards/CountryCard';
import WeatherModal from './components/Weathermodal/WeatherModal';
import { useWeatherContext } from './components/Weathermodal/WeatherContext';
import './styles/global.css';
import { useRouter } from 'next/router';

const HomePage = () => {
 const { countries, selectedCountry, isModalOpen, weatherData, handleWeatherClick, setIsModalOpen } = useWeatherContext();
 const [loading, setLoading] = useState(true)
 
 const closeModal = () => {
   setIsModalOpen(false);
 };
 const User = localStorage.getItem("email")
useEffect(()=>{
     const checkUser = () => {
          if (!User) {
               window.location.href = '/loginn'
          } else {
               setLoading(false)
          }

     };
     checkUser();
},[User])
 
 
 const logout = () => {
     localStorage.clear()
     window.location.href= '/loginn'
 }

 if (loading) {
     return <div className='loading'>Loading...</div>
 }
 return (
     <>
     <button className='logout' onClick={logout}>Log out</button>
     <h2 className='message'>Welcome, {User}</h2>
     
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
<WeatherModal isOpen={isModalOpen} onRequestClose={closeModal} weatherData={weatherData} />
     )}
</div>
</>
 );
};
export default HomePage;