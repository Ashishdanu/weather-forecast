import { useEffect, useState } from "react";
import "../styles/Weather.css";

const Weather = () => {
  const API_Key = "234769aa7f9b12b2f7087085021ea303";
  const [current, setCurrent] = useState(
    localStorage.getItem("current_search") || "Ho Chi Minh"
  );
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  // const [numberofdaystoforecast, setdays] = useState(0);
  useEffect(() => {
    if (current) {
      localStorage.setItem("current_search", current);
    }
  }, [current]);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${current}&appid=${API_Key}&units=metric`
        );
        const data = await weatherData.json();

        const forecastData = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${current}&cnt=4&appid=${API_Key}&units=metric`
        );
        const forecastResult = await forecastData.json();
        console.log("Forecast Data:", forecastResult);

        setWeather(data);
        const dailyForecast = forecastResult.list.slice(1);
        setForecast(dailyForecast);
        // console.log(
        //   "Forecast accpording to the number of days:",
        //   forecastResult.list.slice(1)
        // );
        console.log("forcast state ", dailyForecast);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [current]);

  return (
    <>
      <section id="container" className="weather-container">
        <h1 className="header">Weather Application</h1>
        <div className="select-container">
          <select
            name="Area"
            id="Area"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="select-area">
            <option value="Ho Chi Minh">Ho Chi Minh</option>
            <option value="Singapore">Singapore</option>
            <option value="Kuala Lumpur">Kuala Lumpur</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Athens">Athens</option>
          </select>
        </div>
      </section>
      {/* <section>
        <input

          type="text"
          value={numberofdaystoforecast}
          onChange={(e) => setdays(e.target.value)}
        />
        <button onClick={handle_days}>Get Weather</button>
      </section> */}
      <section className="weather-info">
        {weather ? (
          <>
            <h2>Current Weather: {weather.weather[0].description}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </>
        ) : (
          <p className="loading">Loading weather data...</p>
        )}

        <div className="forecast">
          <h3>3-Day Forecast</h3>
          {forecast.length > 0 ? (
            forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <p>
                  <strong>Day {index + 1}:</strong>{" "}
                  {new Date(day.dt * 1000).toLocaleDateString()}
                </p>
                <p>Temperature: {day.main.temp}°C</p>
                <p>Weather: {day.weather[0].description}</p>
                <p>Humidity: {day.main.humidity}%</p>
                <p>Wind Speed: {day.wind.speed} m/s</p>
              </div>
            ))
          ) : (
            <p>Loading forecast...</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Weather;
