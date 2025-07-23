import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = "0d408a7c9dcb8e94da2672f86fc7350c";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const city = localStorage.getItem("city");
  const navigate = useNavigate();

  useEffect(() => {
    if (!city) {
      navigate("/");
      return;
    }

    const res = axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((res) => {
        setWeatherData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    console.log(res);
  }, [city, navigate]);

  const fahrenheit = useMemo(() => {
    if (!weatherData) return null;
    return (weatherData.main.temp * 9) / 5 + 32;
  }, [weatherData]);

  if (loading) return <p>Loading weather data...</p>;

  if (!weatherData) return <p>Failed to fetch weather data.</p>;

  return (
    <div className="card">
      <h2>Weather in {weatherData.name}</h2>
      <p>
        Temperature: {weatherData.main.temp}°C / {fahrenheit.toFixed(1)}°F
      </p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind: {weatherData.wind.speed} m/s</p>
      <p>Condition: {weatherData.weather[0].description}</p>
    </div>
  );
}

export default Weather;
