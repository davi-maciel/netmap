"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Link from "next/link";
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const mapContainerRef = useRef(null);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Initialize blurred map in background
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://tiles.openfreemap.org/styles/bright",
      center: [0, 20],
      zoom: 2,
      interactive: false, // Disable interactions on login page
      attributionControl: false,
    });

    return () => map.remove();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      return
    }

    router.push("/")
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Blurred Map Background */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 blur-sm"
        style={{ filter: "blur(8px)" }}
      />

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />

      {/* Login Form */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl p-8">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🗺️ NetMap</h1>
            <p className="text-gray-600">Visualize your global network</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
