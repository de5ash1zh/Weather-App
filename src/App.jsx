import { Oval } from "react-loader-spinner";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function WeatherApp() {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toDateFunction = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString();
  };

  useEffect(() => {
    const savedWeatherData = localStorage.getItem("weatherData");
    if (savedWeatherData) {
      setWeatherData(JSON.parse(savedWeatherData));
    }
  }, []);

  const saveWeatherDataToStorage = (data) => {
    localStorage.setItem("weatherData", JSON.stringify(data));
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setLoading(true);
      setError(false);
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const api_key = "f00c38e0279b7bc85480c3fe775d518c";
      await axios
        .get(url, {
          params: {
            q: input,
            units: "metric",
            appid: api_key,
          },
        })
        .then((res) => {
          console.log("res", res);
          const newData = [...weatherData, res.data];
          setWeatherData(newData);
          saveWeatherDataToStorage(newData);
          setLoading(false);
          setError(false);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          console.log("error", error);
        });
      setInput("");
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const removeWeatherData = (index) => {
    const newData = [...weatherData];
    newData.splice(index, 1);
    setWeatherData(newData);
    saveWeatherDataToStorage(newData);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <h1 className="app-name">Weather App</h1>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <div className="search-bar">
        <input
          type="text"
          className={`city-search ${darkMode ? "dark-mode" : ""}`}
          placeholder="Enter City Name..."
          name="query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={search}
        />
      </div>
      {loading && (
        <>
          <br />
          <br />
          <Oval
            type="Oval"
            color={darkMode ? "white" : "black"}
            height={100}
            width={100}
          />
        </>
      )}
      {error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: "20px" }}>City not found</span>
          </span>
        </>
      )}
      <div className="weather-container">
        {weatherData
          .slice(0)
          .reverse()
          .map((data, index) => (
            <div className="weather-info" key={index}>
              <div className="delete-button-container">
                <div
                  className="delete-button"
                  onClick={() => removeWeatherData(index)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
              <div className="city-name">
                <h2>
                  {data.name}, <span>{data.sys.country}</span>
                </h2>
              </div>
              <div className="date">
                <span>{toDateFunction()}</span>
              </div>
              <div className="weather-details">
                <p>Temperature: {data.main.temp}°C</p>
                <p>Humidity: {data.main.humidity}%</p>
                <p>Wind Speed: {data.wind.speed}m/s</p>
                <p>Description: {data.weather[0].description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default WeatherApp;
