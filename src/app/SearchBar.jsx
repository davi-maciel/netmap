"use client";

import React, { useState } from "react";
import { getAvatarUrl } from "../lib/avatar";
import { sanitizeText } from "../lib/sanitize";

/**
 * SearchBar - Soft Glass/Frosted Effect
 * - Semi-transparent white with backdrop blur
 * - Modern premium feel that floats above the map
 * - Larger rounded corners (rounded-xl)
 * - Smooth transitions
 */

const SearchBar = ({ people, onSelectPerson }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Filter people based on search query
  const filteredPeople = searchQuery.trim()
    ? people.filter((person) => {
        const fullName =
          `${person.first_name} ${person.last_name}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
      })
    : [];

  const handleInputChange = (e) => {
    // Sanitize input to prevent XSS
    const sanitized = sanitizeText(e.target.value, 100);
    setSearchQuery(sanitized);
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
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full h-12 ps-16 pr-10 text-sm text-gray-900 border border-white/30 rounded-xl bg-white/80 backdrop-blur-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-lg hover:bg-white/90"
            placeholder="Search for people"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-6 pointer-events-none">
            <svg
              className="w-4 h-4 text-black transition-colors"
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
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-gray-600 absolute end-2.5 top-1/2 -translate-y-1/2 hover:text-gray-800 font-medium rounded-lg text-sm px-2 py-2 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && filteredPeople.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white/90 backdrop-blur-md border border-white/30 rounded-xl shadow-xl max-h-96 overflow-y-auto transition-all">
            {filteredPeople.map((person) => (
              <div
                key={person.id}
                className="flex items-center gap-3 p-3 hover:bg-white/70 cursor-pointer border-b border-gray-200/50 last:border-b-0 transition-all first:rounded-t-xl last:rounded-b-xl"
                onClick={() => handleSelectPerson(person)}
              >
                <img
                  src={getAvatarUrl(
                    person.first_name,
                    person.last_name,
                    person.profile_picture_url
                  )}
                  alt={`${person.first_name} ${person.last_name}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {person.first_name} {person.last_name}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
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
