import React, { useEffect } from 'react';
import Modal from 'react-modal';
import './WeatherModal.css'
interface WeatherModalProps {
 isOpen: boolean;
 onRequestClose: () => void;
 weatherData: any;
}
const WeatherModal: React.FC<WeatherModalProps> = ({ isOpen, onRequestClose, weatherData }) => {
 useEffect(() => {
   const nextElement = document.querySelector('#__next');
   if (typeof document !== 'undefined' && nextElement) {
     Modal.setAppElement('nextElement');
   }
 }, []);
 return (
<Modal
     isOpen={isOpen}
     onRequestClose={onRequestClose}
     contentLabel="Weather Modal"
     className="weather-modal"
     overlayClassName="weather-modal-overlay"
>
<div className="modal-header">
<h2>Weather in {weatherData?.name}</h2>
<button className="close-button" onClick={onRequestClose}>
&times;
</button>
</div>
<div className="modal-content">
<p>
<strong>Temperature:</strong> {weatherData?.main.temp} °C
</p>
<p>
<strong>Weather:</strong> {weatherData?.weather[0].description}
</p>
<p>
<strong>Humidity:</strong> {weatherData?.main.humidity}%
</p>
<p>
<strong>Wind Speed:</strong> {weatherData?.wind.speed} m/s
</p>
</div>
</Modal>
 );
};
export default WeatherModal;