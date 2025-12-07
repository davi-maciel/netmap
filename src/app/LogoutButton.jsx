"use client";

import React from "react";

/**
 * LogoutButton - Logout button positioned below the add person button
 * - Frosted glass aesthetic matching other UI elements
 * - Same positioning style as AddPersonButton
 */
const LogoutButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute bottom-5 right-5 z-10 px-4 py-2.5 bg-white/80 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            title="Logout"
        >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-gray-700 font-medium text-sm">Logout</span>
        </button>
    );
};

export default LogoutButton;
