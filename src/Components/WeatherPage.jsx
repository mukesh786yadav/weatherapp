import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import WeatherCard from "./WeatherCard";
import Spinner from "./Spinner";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const { cityName } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        //console.log(cityName);
        const locationResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        console.log("Location response:", locationResponse); // Log the entire response object
        setWeatherData(locationResponse.data);
        const { lon, lat } = locationResponse.data.coord;
        console.log(lon);
        console.log(lat);

        // const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        // console.log("Weather response:", weatherResponse); // Log the entire response object
        // setWeatherData(weatherResponse.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [cityName, apiKey]);

  if (!weatherData) {
    return (
      <Spinner></Spinner>
    );
  }

  return (
    <div className="w-4/5 mx-auto mt-6 ">
      <WeatherCard data={weatherData} />
    </div>
  );
};

export default WeatherPage;
