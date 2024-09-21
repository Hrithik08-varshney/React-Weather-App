import React from 'react';

const WeatherCondition = ({ condition }) => {
  return (
    <div className="weather-condition">
      <p>Condition: {condition}</p>
    </div>
  );
};

export default WeatherCondition;
