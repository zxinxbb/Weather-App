import "./App.css";
import { useState } from "react";

const api = {
  key: "52de84005004e618118759968c143dcf",//need to sort that
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const handler = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);

        // forecast API call
        fetch(`${api.base}forecast?q=${search}&units=metric&APPID=${api.key}`)
          .then((res) => res.json())
          .then((result) => {
            
            const middayForecasts = result.list.filter((item) => {
              const date = new Date(item.dt_txt);
              return date.getHours() === 12; // midday only
            });

            setForecast(middayForecasts);
          })
          .catch((error) => {
            console.error("Error fetching forecast data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
     
        <h1>Weather App</h1>

        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handler}>Search</button>
        </div>



      <div className="boxes-container">

        <div className="weather-info">
          {typeof weather.main !== "undefined" ? (
            <div className="weather-box">
              <p>Location: {weather.name}</p>
              <p>Current Temperature: {weather.main.temp}°C</p>
              <p>Feels Like: {weather.main.feels_like}</p>
              <p>Condition: {weather.weather[0].main}</p>
              <p>Description: ({weather.weather[0].description})</p>
            </div>
          ) : (
            ""
          )}

          <div className="forecast-boxes">
            {forecast.map((item, index) => (
              <div key={index} className="forecast-box">
                <p>Date: {item.dt_txt}</p>
                <p> {item.main.temp}°C</p>
               
              </div>
            ))}
          </div>
        </div>
        </div>
      </header>
    </div>
  );
};

export default App;
