import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import WeatherCard from "./WeatherCard";
import Spinner from "./Spinner";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { cityName } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        //console.log(cityName);
        const locationResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        //console.log("Location response:", locationResponse); // Log the entire response object
        setWeatherData(locationResponse.data);
        //const { lon, lat } = locationResponse.data.coord;
        //console.log(lon);
        //console.log(lat);
      } catch (error) {
        setError(error);;
      } finally {
        setIsLoading(false); 
      }
    };

    fetchWeatherData();
  }, [cityName, apiKey]);
  
  if (error) {
    return (
      <>
       <div className=" flex justify-center items-center max-w-sm mt-24 mx-auto p-6 bg-red-300 border border-gray-800 rounded-lg shadow hover:bg-gray-100" >
         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
         No weather data found for {cityName}
         </h5>
         
       </div>

      </>
    );
  }
  if (isLoading) {
    return <Spinner />;
  }
  if (!weatherData) {
    return <div className="text-center">No weather data found for {cityName}</div>;
  }

  return (
    <div className="w-4/5 mx-auto mt-6 ">
      <WeatherCard data={weatherData} />
    </div>
  );
};

export default WeatherPage;
