"use client";

import React, { useEffect } from "react";

/**
 * Notification - Toast notification component
 * - Appears centered at the top of the page
 * - Auto-dismisses after 3 seconds
 * - Supports success and error states
 * - Frosted glass aesthetic
 */
const Notification = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, 3000); // Auto-dismiss after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    const typeStyles = {
        success: {
            bg: "bg-green-50/90",
            border: "border-green-200",
            text: "text-green-800",
            icon: "✓"
        },
        error: {
            bg: "bg-red-50/90",
            border: "border-red-200",
            text: "text-red-800",
            icon: "✕"
        }
    };

    const styles = typeStyles[type] || typeStyles.success;

    return (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className={`${styles.bg} ${styles.border} backdrop-blur-md border rounded-xl shadow-lg px-6 py-3 flex items-center gap-3 min-w-[320px] max-w-md`}>
                {/* Icon */}
                <div className={`flex-shrink-0 w-6 h-6 rounded-full ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center text-white text-sm font-bold`}>
                    {styles.icon}
                </div>

                {/* Message */}
                <p className={`flex-1 ${styles.text} font-medium text-sm`}>
                    {message}
                </p>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className={`flex-shrink-0 ${styles.text} hover:opacity-70 transition-opacity text-lg`}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Notification;
