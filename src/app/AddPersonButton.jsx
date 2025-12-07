"use client";

import React from "react";

/**
 * AddPersonButton - Circular button to add new people
 * - Matches the frosted glass aesthetic of SearchBar and Zoom controls
 * - Positioned in top-right corner
 */
const AddPersonButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute top-5 right-5 z-10 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
            aria-label="Add Person"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 text-black"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                />
            </svg>
        </button>
    );
};

export default AddPersonButton;
