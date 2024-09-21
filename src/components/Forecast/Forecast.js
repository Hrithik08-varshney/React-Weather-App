import React from 'react';
import ForecastCard from "../ForecastCard/ForecastCard"
const Forecast = ({ data, isCelsius, toFahrenheit }) => {
  const dailyForecast = data.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });

    if (!acc[day]) {
      acc[day] = {
        high: item.main.temp_max,
        low: item.main.temp_min,
        icon: item.weather[0].icon,
      };
    } else {
      acc[day].high = Math.max(acc[day].high, item.main.temp_max);
      acc[day].low = Math.min(acc[day].low, item.main.temp_min);
    }
    return acc;
  }, {});

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      <div className="forecast-list">
        {Object.keys(dailyForecast).map((day, index) => (
          <ForecastCard
            key={index}
            day={day}
            highTemp={dailyForecast[day].high}
            lowTemp={dailyForecast[day].low}
            icon={dailyForecast[day].icon}
            isCelsius={isCelsius}
            toFahrenheit={toFahrenheit}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;
