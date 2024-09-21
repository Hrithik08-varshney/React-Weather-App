import React from 'react';

const WeatherIcon = ({ icon }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-icon">
      <img src={iconUrl} alt="Weather Icon" />
    </div>
  );
};

export default WeatherIcon;
