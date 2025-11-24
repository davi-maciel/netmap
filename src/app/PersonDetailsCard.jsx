"use client";

import React from "react";

/**
 * PersonDetailsCard - Display detailed person information
 * - Frosted glass effect matching SearchBar
 * - Extends from below search bar to bottom with equal padding
 * - Profile picture at top (not circle cropped)
 * - Shows name, bio, and locations with labels
 */

const PersonDetailsCard = ({ person, onClose }) => {
  if (!person) return null;

  console.log("Rendering PersonDetailsCard with person:", person);

  return (
    <div
      className="mt-4 bg-white/90 backdrop-blur-md border border-white/30 rounded-xl shadow-xl overflow-hidden flex flex-col"
      style={{
        height: 'calc(100vh - 120px)',
      }}
    >
      {/* Profile Picture Header */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={person.profile_picture}
          alt={`${person.first_name} ${person.last_name}`}
          className="w-full h-full object-cover object-top"
        />
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all shadow-md"
        >
          ✕
        </button>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Name */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {person.first_name} {person.last_name}
        </h2>

        {/* Bio */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          {person.bio}
        </p>

        {/* Locations Section */}
        {person.locations && person.locations.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Locations
            </h3>
            <div className="space-y-3">
              {person.locations.map((location) => (
                <div
                  key={location.id}
                  className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 transition-all hover:bg-white/90"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">📍</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {location.label}
                      </div>
                      <div className="text-sm text-gray-600 mt-0.5">
                        {location.connection}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonDetailsCard;
