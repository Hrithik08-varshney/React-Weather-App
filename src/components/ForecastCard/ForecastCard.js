import React from "react";
import "./ForecastCard.css";
const ForecastCard = ({
  day,
  highTemp,
  lowTemp,
  icon,
  isCelsius,
  toFahrenheit,
}) => {
  const highTemperature = isCelsius ? highTemp : toFahrenheit(highTemp);
  const lowTemperature = isCelsius ? lowTemp : toFahrenheit(lowTemp);

  return (
    <div className="forecast-card">
      <div className="forecast-inner-div">
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt="Weather icon"
        />
      </div>
      <div className="forecast-inner-div">
        <h3>{day}</h3>
        <p>
          High: {Math.round(highTemperature)}°{isCelsius ? "C" : "F"}
        </p>
        <p>
          Low: {Math.round(lowTemperature)}°{isCelsius ? "C" : "F"}
        </p>
      </div>
    </div>
  );
};

export default ForecastCard;
