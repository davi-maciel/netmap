"use client";

import React, { useState } from "react";
import LocationAutocomplete from "./LocationAutocomplete";
import { compressProfilePicture } from "../lib/imageCompression";
import { INPUT_LIMITS } from "../lib/sanitize";

/**
 * AddPersonCard - Card to add a new person
 * - Opens from the top-right corner (anchored to the button position)
 * - Frosted glass aesthetic
 * - Supports multiple locations with connection types
 */
const AddPersonCard = ({ onClose, onAdd, onNotification }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        bio: "",
        profilePicture: "",
        locations: [], // Array of {label, latitude, longitude, connection}
    });

    // Temporary state for adding a new location
    const [newLocation, setNewLocation] = useState({
        locationData: null, // {label, latitude, longitude}
        connection: "College", // Default connection type
        customConnection: "", // Custom connection type when "Custom" is selected
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
        "Custom"
    ];

    const handleChange = async (e) => {
        const { name, value, files } = e.target;

        // Handle file upload with compression
        if (files && files[0]) {
            const { file: compressedFile, error } = await compressProfilePicture(files[0]);

            if (error) {
                if (onNotification) {
                    onNotification({ message: error, type: 'error' });
                }
                e.target.value = ''; // Clear the input
                return;
            }

            setFormData((prev) => ({
                ...prev,
                [name]: compressedFile,
            }));
        } else {
            // Enforce limits programmatically
            let finalValue = value;
            if (name === "firstName" || name === "lastName") {
                if (value.length > INPUT_LIMITS.NAME) finalValue = value.slice(0, INPUT_LIMITS.NAME);
            } else if (name === "bio") {
                if (value.length > INPUT_LIMITS.BIO) finalValue = value.slice(0, INPUT_LIMITS.BIO);
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
                onNotification({ message: 'Please select a location from the suggestions', type: 'error' });
            }
            return;
        }

        // If "Custom" is selected, validate that customConnection is not empty
        if (newLocation.connection === "Custom" && !newLocation.customConnection.trim()) {
            if (onNotification) {
                onNotification({ message: 'Please enter a custom connection type', type: 'error' });
            }
            return;
        }

        const locationToAdd = {
            ...newLocation.locationData,
            connection: newLocation.connection === "Custom" ? newLocation.customConnection : newLocation.connection,
        };

        setFormData((prev) => ({
            ...prev,
            locations: [...prev.locations, locationToAdd],
        }));

        // Reset the new location form
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (formData.locations.length === 0) {
            if (onNotification) {
                onNotification({ message: 'Please add at least one location', type: 'error' });
            }
            return;
        }

        if (onAdd) {
            onAdd(formData);
        }

        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="absolute top-5 right-5 z-20 w-96 max-h-[calc(100vh-40px)] bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 flex-shrink-0">
                <h2 className="text-lg font-semibold text-gray-900">Add New Person</h2>
                <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-gray-500 hover:text-gray-800 transition-colors"
                >
                    ✕
                </button>
            </div>

            {/* Form Content - Scrollable */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
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
                            placeholder="Jane"
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
                            placeholder="Doe"
                            maxLength={INPUT_LIMITS.NAME}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        placeholder="A bit about this person..."
                        maxLength={INPUT_LIMITS.BIO}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
                    />
                </div>

                {/* Locations Section */}
                <div className="border-t border-gray-200/50 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Locations {formData.locations.length > 0 && `(${formData.locations.length})`}
                    </label>

                    {/* Display added locations */}
                    {formData.locations.length > 0 && (
                        <div className="space-y-2 mb-3">
                            {formData.locations.map((location, index) => (
                                <div
                                    key={index}
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
                            placeholder="Search for a location..."
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
                                    placeholder="Enter custom connection type..."
                                    maxLength={INPUT_LIMITS.CONNECTION}
                                    className="w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Add Person
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPersonCard;
