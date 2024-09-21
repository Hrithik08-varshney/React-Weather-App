const Weather = ({ data, isCelsius, toFahrenheit }) => {
  const temperature = isCelsius ? data.main.temp : toFahrenheit(data.main.temp);

  return (
    <div>
      <h2>Current Weather in {data.name}</h2>
      <p>Temperature: {Math.round(temperature)}°{isCelsius ? 'C' : 'F'}</p>
      <p>Condition: {data.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        alt={data.weather[0].description}
      />
    </div>
  );
};

export default Weather;
