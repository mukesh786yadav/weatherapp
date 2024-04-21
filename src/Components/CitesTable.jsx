import React, { useEffect, useState } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const CitesTable = () => {
  const api_url = import.meta.env.VITE_CITY_API_URL;

  const [data, setData] = useState([]);
  const [searchCityName, setSearchCityName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${api_url}?limit=100&offset=${(page - 1) * 100}`
      );
      setData([...data, ...response.data.results]);
      setPage(page + 1);
      setHasMore(response.data.results.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchCityName = (event, { newValue }) => {
    setSearchCityName(newValue);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : data.filter(
          (city) => city.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  useEffect(() => {
    fetchData();
  }, []);

  //console.log(data);

  return (
    <div className="max-w-4xl mx-auto mt-10  bg-gray-100">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="mx-auto my-auto  mt-5 ">
          <h1 className="font-semibold text-center text-2xl md:text-2xl">
            Know Your City Weather Status{" "}
          </h1>
        </div>
        <div className="p-4">
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={(suggestion) => suggestion.name}
              renderSuggestion={renderSuggestion}
              inputProps={{
                className:
                  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                placeholder: "Search Your City",
                value: searchCityName,
                onChange: handleSearchCityName,
              }}
            />
          </div>
        </div>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more cities to show</p>}
        >
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  City Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Country
                </th>
                <th scope="col" className="px-6 py-3">
                  Timezone
                </th>
                <th scope="col" className="px-6 py-3">
                  Country Code
                </th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((item) => {
                  return searchCityName.toLowerCase() === ""
                    ? item
                    : item.ascii_name.toLowerCase().includes(searchCityName);
                })
                .map((item) => (
                  <tr
                    key={item.recordid}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      <a
                        href={`/weather/${item.ascii_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onContextMenu={(e) => {
                          e.preventDefault(); // Prevent default right-click behavior
                          window.open(`/weather/${item.ascii_name}`, "_blank");
                        }}
                      >
                        {item.ascii_name}
                      </a>
                      <Link to={`/weather/${item.ascii_name}`}>
                        {item.ascii_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{item.cou_name_en}</td>
                    <td className="px-6 py-4">{item.timezone}</td>
                    <td className="px-6 py-4">{item.country_code}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default CitesTable;
