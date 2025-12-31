"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LocationAutocomplete from "./LocationAutocomplete";
import { compressProfilePicture } from "../lib/imageCompression";
import { getAvatarUrl } from "../lib/avatar";
import { INPUT_LIMITS } from "../lib/sanitize";

/**
 * PersonDetailsCard - Display detailed person information
 * - Frosted glass effect matching SearchBar
 * - Extends from below search bar to bottom with equal padding
 * - Profile picture at top (not circle cropped)
 * - Shows name, bio, and locations with labels
 * - Edit mode with pen icon toggle
 */

const PersonDetailsCard = ({
  person,
  onClose,
  onSave,
  onDelete,
  onNotification,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: person?.first_name || "",
    lastName: person?.last_name || "",
    bio: person?.bio || "",
    profilePicture: person?.profile_picture_url || "",
    locations: person?.locations || [],
  });

  // Key to force file input reset when needed
  const [fileInputKey, setFileInputKey] = useState(0);

  // Temporary state for adding a new location in edit mode
  const [newLocation, setNewLocation] = useState({
    locationData: null,
    connection: "College",
    customConnection: "",
  });

  const connectionTypes = [
    "College",
    "Hometown",
    "Work",
    "Grad School",
    "School",
    "Home",
    "Family",
    "Travel",
    "Other",
    "Custom",
  ];

  // Sync form data when person changes
  useEffect(() => {
    if (!person) return;

    setFormData({
      firstName: person.first_name,
      lastName: person.last_name,
      bio: person.bio,
      profilePicture: person.profile_picture_url,
      locations: person.locations || [],
    });
    setIsEditing(false); // Reset to view mode when person changes
  }, [person]); // Re-run when person updates

  // Early return AFTER all hooks have been called
  if (!person) return null;

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePictureFile" && files && files[0]) {
      // Compress and convert to WebP
      const { file: compressedFile, error } = await compressProfilePicture(
        files[0]
      );

      if (error) {
        if (onNotification) {
          onNotification({ message: error, type: "error" });
        }
        // Force reset of file input by changing its key
        setFileInputKey((prev) => prev + 1);
        return;
      }

      // Handle file upload - create a preview URL
      const previewUrl = URL.createObjectURL(compressedFile);
      setFormData((prev) => ({
        ...prev,
        profilePicture: previewUrl, // Update preview
        profilePictureFile: compressedFile, // Store compressed file for upload
      }));
    } else {
      // Enforce limits programmatically
      let finalValue = value;
      if (name === "firstName" || name === "lastName") {
        if (value.length > INPUT_LIMITS.NAME)
          finalValue = value.slice(0, INPUT_LIMITS.NAME);
      } else if (name === "bio") {
        if (value.length > INPUT_LIMITS.BIO)
          finalValue = value.slice(0, INPUT_LIMITS.BIO);
      }

      setFormData((prev) => ({
        ...prev,
        [name]: finalValue,
      }));
    }
  };

  const handleAddLocation = () => {
    if (!newLocation.locationData) {
      if (onNotification) {
        onNotification({
          message: "Please select a location from the suggestions",
          type: "error",
        });
      }
      return;
    }

    // If "Custom" is selected, validate that customConnection is not empty
    if (
      newLocation.connection === "Custom" &&
      !newLocation.customConnection.trim()
    ) {
      if (onNotification) {
        onNotification({
          message: "Please enter a custom connection type",
          type: "error",
        });
      }
      return;
    }

    const locationToAdd = {
      ...newLocation.locationData,
      connection:
        newLocation.connection === "Custom"
          ? newLocation.customConnection
          : newLocation.connection,
      id: Date.now(), // Temporary ID for new locations
    };

    setFormData((prev) => ({
      ...prev,
      locations: [...prev.locations, locationToAdd],
    }));

    setNewLocation({
      locationData: null,
      connection: "College",
      customConnection: "",
    });
  };

  const handleRemoveLocation = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleLocationChange = (locationData) => {
    setNewLocation((prev) => ({
      ...prev,
      locationData,
    }));
  };

  const handleConnectionChange = (e) => {
    setNewLocation((prev) => ({
      ...prev,
      connection: e.target.value,
    }));
  };

  const handleCustomConnectionChange = (e) => {
    setNewLocation((prev) => ({
      ...prev,
      customConnection: e.target.value,
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...person,
        first_name: formData.firstName,
        last_name: formData.lastName,
        bio: formData.bio,
        profile_picture: formData.profilePicture,
        profilePictureFile: formData.profilePictureFile, // The actual File object for upload
        locations: formData.locations,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original person data
    setFormData({
      firstName: person.first_name,
      lastName: person.last_name,
      bio: person.bio,
      profilePicture: person.profile_picture_url,
      locations: person.locations || [],
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${person.first_name} ${person.last_name}? This action cannot be undone.`
      )
    ) {
      if (onDelete) {
        onDelete(person);
      }
    }
  };

  return (
    <div
      className="mt-4 bg-white/80 backdrop-blur-md border border-white/30 rounded-xl shadow-xl overflow-hidden flex flex-col"
      style={{
        height: "calc(100vh - 120px)",
      }}
    >
      {/* Profile Picture Header */}
      <div className="relative h-64 overflow-hidden group">
        <img
          src={
            isEditing
              ? getAvatarUrl(
                  formData.firstName,
                  formData.lastName,
                  formData.profilePicture
                )
              : getAvatarUrl(
                  person.first_name,
                  person.last_name,
                  person.profile_picture_url
                )
          }
          alt={`${person.first_name} ${person.last_name}`}
          className="w-full h-full object-cover object-top"
        />

        {/* Edit Overlay - Only shows in edit mode */}
        {isEditing && (
          <label className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-12 h-12 text-white mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-white font-medium text-sm">Change Photo</span>
            <input
              key={fileInputKey}
              type="file"
              name="profilePictureFile"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all shadow-md z-10"
        >
          ✕
        </button>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        {!isEditing ? (
          <>
            {/* View Mode */}
            {/* Name with Edit Button */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                {person.first_name} {person.last_name}
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all"
                title="Edit person"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>

            {/* Bio */}
            <div className="text-gray-700 mb-6 leading-relaxed [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mt-4 [&>h1]:mb-2 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-3 [&>h2]:mb-2 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-2 [&>h3]:mb-1 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:my-2 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:my-2 [&>li]:my-1 [&>p]:mb-2 [&>a]:text-blue-600 [&>a]:underline [&>strong]:font-bold [&>em]:italic [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {person.bio}
              </ReactMarkdown>
            </div>

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
          </>
        ) : (
          <>
            {/* Edit Mode */}
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    maxLength={INPUT_LIMITS.NAME}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    maxLength={INPUT_LIMITS.NAME}
                    required
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  maxLength={INPUT_LIMITS.BIO}
                  className="w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  required
                />
              </div>

              {/* Locations Section */}
              <div className="border-t border-gray-200/50 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Locations{" "}
                  {formData.locations.length > 0 &&
                    `(${formData.locations.length})`}
                </label>

                {/* Display added locations */}
                {formData.locations.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {formData.locations.map((location, index) => (
                      <div
                        key={location.id || index}
                        className="flex items-start gap-2 p-2 bg-blue-50/50 border border-blue-100 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            📍 {location.label}
                          </div>
                          <div className="text-xs text-gray-600 mt-0.5">
                            {location.connection}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveLocation(index)}
                          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new location form */}
                <div className="space-y-2">
                  <LocationAutocomplete
                    value={newLocation.locationData?.label || ""}
                    onChange={handleLocationChange}
                    placeholder="Search for a location"
                    maxLength={INPUT_LIMITS.LOCATION_LABEL}
                  />

                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <select
                        value={newLocation.connection}
                        onChange={handleConnectionChange}
                        className="flex-1 px-3 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                      >
                        {connectionTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={handleAddLocation}
                        disabled={!newLocation.locationData}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all"
                      >
                        Add
                      </button>
                    </div>

                    {/* Show custom connection input when "Custom" is selected */}
                    {newLocation.connection === "Custom" && (
                      <input
                        type="text"
                        value={newLocation.customConnection}
                        onChange={handleCustomConnectionChange}
                        placeholder="Enter custom connection type"
                        maxLength={INPUT_LIMITS.CONNECTION}
                        className="w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Cancel
                </button>
              </div>

              {/* Delete Button */}
              <div className="pt-2">
                <button
                  onClick={handleDelete}
                  className="w-full py-2 px-4 rounded-xl font-semibold bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                >
                  Delete Person
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonDetailsCard;
