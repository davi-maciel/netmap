"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * LocationAutocomplete - Autocomplete input for location search using Nominatim
 * - Debounced search to respect rate limits
 * - Dropdown with suggestions
 * - Returns full location object with coordinates
 */
const LocationAutocomplete = ({
  value,
  onChange,
  placeholder = "Search for a location",
  maxLength,
}) => {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef(null);
  const dropdownRef = useRef(null);

  // Sync internal query state with external value prop
  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  // Fetch suggestions from Nominatim API
  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&limit=5&addressdetails=1`,
        {
          headers: {
            "User-Agent": "NetMap/1.0", // Nominatim requires User-Agent
          },
        }
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search (1 second delay to respect Nominatim rate limit)
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 1000);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (suggestion) => {
    // Simplify the location name
    const simplifyLocationName = (displayName, address) => {
      // Try to get a simple name from the address object
      if (address) {
        // Priority order for what to show
        const candidates = [
          address.university,
          address.college,
          address.school,
          address.building,
          address.amenity,
          address.city,
          address.town,
          address.village,
          address.municipality,
          address.county,
          address.state,
          address.country,
        ];

        // Find first non-null candidate
        for (const candidate of candidates) {
          if (candidate) {
            // Add country if it's a city/town/village
            if (address.city || address.town || address.village) {
              return `${candidate}, ${address.country}`;
            }
            return candidate;
          }
        }
      }

      // Fallback: take first 2-3 parts of display_name
      const parts = displayName.split(",").map((p) => p.trim());
      if (parts.length <= 2) return displayName;

      // Return first part + country (last part)
      return `${parts[0]}, ${parts[parts.length - 1]}`;
    };

    const simplifiedLabel = simplifyLocationName(
      suggestion.display_name,
      suggestion.address
    );

    setQuery(simplifiedLabel);
    setShowSuggestions(false);

    // Pass the simplified location object to parent
    if (onChange) {
      onChange({
        label: simplifiedLabel,
        latitude: parseFloat(suggestion.lat),
        longitude: parseFloat(suggestion.lon),
      });
    }
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    if (onChange) {
      onChange(null);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          maxLength={maxLength}
          className="w-full px-3 py-2 pr-20 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          placeholder={placeholder}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {loading && (
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          )}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.place_id}-${index}`}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full px-3 py-2 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="text-sm text-gray-900">
                {suggestion.display_name}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {suggestion.type && (
                  <span className="capitalize">{suggestion.type}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions &&
        !loading &&
        query.length >= 3 &&
        suggestions.length === 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-3">
            <p className="text-sm text-gray-500 text-center">
              No locations found
            </p>
          </div>
        )}
    </div>
  );
};

export default LocationAutocomplete;
