import React, { useEffect } from 'react';
import Modal from 'react-modal';
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
<Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Weather Modal">
<h2>Weather in {weatherData.name}</h2>
<p>Temperature: {weatherData.main.temp} °C</p>
<p>Weather: {weatherData.weather[0].description}</p>
<button onClick={onRequestClose}>Close</button>
</Modal>
 );
};
export default WeatherModal;