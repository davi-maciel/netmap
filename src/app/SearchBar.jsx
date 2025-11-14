"use client";

import React, { useState } from "react";

const SearchBar = ({ people, onSelectPerson }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Filter people based on search query
  const filteredPeople = searchQuery.trim()
    ? people.filter((person) => {
        const fullName = `${person.first_name} ${person.last_name}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
      })
    : [];

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleSelectPerson = (person) => {
    setSearchQuery(`${person.first_name} ${person.last_name}`);
    setShowResults(false);
    if (onSelectPerson) {
      onSelectPerson(person);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    if (onSelectPerson) {
      onSelectPerson(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filteredPeople.length > 0) {
      handleSelectPerson(filteredPeople[0]);
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 pr-24 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for people..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-gray-500 absolute end-24 bottom-2.5 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium rounded-lg text-sm px-2 py-2"
            >
              ✕
            </button>
          )}
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>

        {/* Search Results Dropdown */}
        {showResults && filteredPeople.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-600 max-h-96 overflow-y-auto">
            {filteredPeople.map((person) => (
              <div
                key={person.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                onClick={() => handleSelectPerson(person)}
              >
                <img
                  src={person.profile_picture}
                  alt={`${person.first_name} ${person.last_name}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {person.first_name} {person.last_name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {person.bio}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
