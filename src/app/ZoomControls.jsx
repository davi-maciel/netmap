"use client";

import React from "react";

/**
 * ZoomControls - Custom zoom buttons
 * - Replaces default MapLibre controls for better styling control
 * - Matches AddPersonButton aesthetic (frosted glass, rounded)
 * - Positioned bottom-right, above Logout button
 */
const ZoomControls = ({ onZoomIn, onZoomOut }) => {
    return (
        <div className="absolute bottom-20 right-5 z-10 flex flex-col bg-white/80 backdrop-blur-md border border-white/30 rounded-xl shadow-lg overflow-hidden">
            <button
                onClick={onZoomIn}
                className="w-10 h-10 flex items-center justify-center hover:bg-white/90 transition-colors active:bg-white/70"
                aria-label="Zoom In"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-700"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>
            <div className="h-[1px] w-full bg-gray-200/50" />
            <button
                onClick={onZoomOut}
                className="w-10 h-10 flex items-center justify-center hover:bg-white/90 transition-colors active:bg-white/70"
                aria-label="Zoom Out"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-700"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                    />
                </svg>
            </button>
        </div>
    );
};

export default ZoomControls;
