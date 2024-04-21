import React from "react";
import WeatherImages from "./WeatherImages";
import WeatherIcons from "./WeatherIcons";

const WeatherCard = ({ data }) => {
  let capitalizedDescription = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
  const formattedDescription = capitalizedDescription.replace(/\s+/g, "").toLowerCase();

  return (
    <>
      <section className="bg-white dark:bg-gray-900 w-full rounded-md">
        <div className="container px-3 py-6 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            {data.name} Weather
          </h1>
          <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <WeatherImages formattedDescription={formattedDescription} />
            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
              <div className="flex flex-col bg-gray-100 rounded p-4 w-full max-w-md ">
                <div className="font-bold text-xl">{data.name}</div>
                {/* <div className="text-sm text-gray-500">Thursday 10 May 2020</div> */}
                <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                  <WeatherIcons formattedDescription={formattedDescription}/>
                  
                </div>
                <div className="flex flex-row items-center justify-center mt-6">
                  <div className="font-medium text-6xl">{data.main.temp}°C</div>
                  <div className="flex flex-col items-center ml-6">
                    <div>{capitalizedDescription}</div>
                    <div className="mt-1">
                      <span className="text-sm">
                        <i className="far fa-long-arrow-up" />
                      </span>
                      <span className="text-sm font-light text-gray-500">
                        Min {data.main.temp_min}°C
                      </span>
                    </div>
                    <div>
                      <span className="text-sm">
                        <i className="far fa-long-arrow-down" />
                      </span>
                      <span className="text-sm font-light text-gray-500">
                        Max {data.main.temp_max}°C
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mt-6">
                  <div className="flex flex-col items-center">
                    <div className="font-medium text-sm">Wind</div>
                    <div className="text-sm text-gray-500">
                      {data.wind.speed} k/h
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-medium text-sm">Humidity</div>
                    <div className="text-sm text-gray-500">
                      {data.main.humidity} %
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="font-medium text-sm">Pressure</div>
                    <div className="text-sm text-gray-500">
                      {data.main.pressure} hPa
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WeatherCard;
