import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Weather from "./components/Weather/Weather";
import CustomInput from "./components/CustomInput/CustomInput";
import Forecast from "./components/Forecast/Forecast";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("New York"); // Default city
  const [error, setError] = useState("");
  const [isCelsius, setIsCelsius] = useState(true); // State for temperature unit

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  // Load cached data on component mount
  useEffect(() => {
    const cachedWeather = localStorage.getItem("weatherData");
    const cachedCity = localStorage.getItem("lastSearchedCity");

    if (cachedWeather && cachedCity) {
      setWeatherData(JSON.parse(cachedWeather));
      setCity(cachedCity);
    } else {
      fetchWeather(city);
    }
  }, []);

  const fetchWeather = async (cityToFetch) => {
    setLoading(true);
    setError("");
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch}&units=metric&appid=${apiKey}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityToFetch}&units=metric&appid=${apiKey}`
      );

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data.list);
      setLoading(false);

      // Cache the weather data and city
      localStorage.setItem("weatherData", JSON.stringify(weatherResponse.data));
      localStorage.setItem("lastSearchedCity", cityToFetch);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setError("City not found. Please try again.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    fetchWeather(selectedCity);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  const toFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  return (
    <div className="App">
      <h1>Weather App</h1>

      <CustomInput onCitySelect={handleCitySelect} />

      <button onClick={toggleTemperatureUnit}>
        Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {weatherData && (
            <Weather
              data={weatherData}
              isCelsius={isCelsius}
              toFahrenheit={toFahrenheit}
            />
          )}
          {forecastData.length > 0 && (
            <Forecast
              data={forecastData}
              isCelsius={isCelsius}
              toFahrenheit={toFahrenheit}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
