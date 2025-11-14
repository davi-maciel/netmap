"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./page.module.css";
import { getLocationsWithPeople, people } from "@/data/mockData";
import SearchBar from "./SearchBar";

export default function Home() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const markerElementsRef = useRef({});
  const [selectedPerson, setSelectedPerson] = useState(null);
  const locationsWithPeople = getLocationsWithPeople();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [0, 20],
      zoom: 2,
      attributionControl: false, // Remove attribution control
    });

    mapRef.current = map;

    // Add navigation controls on the right side instead
    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Clear selection when clicking on the map
    map.on('click', () => {
      setSelectedPerson(null);
    });

    // Add markers for each location
    locationsWithPeople.forEach((location) => {
      const { person } = location;
      const lngLat = [location.longitude, location.latitude];

      // Create custom marker element
      const el = document.createElement("div");
      el.className = styles.marker;
      el.style.backgroundImage = `url(${person.profile_picture})`;
      el.style.width = "70px";
      el.style.height = "70px";
      el.dataset.personId = person.id;

      // Create popup with person info
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 10px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">
            ${person.first_name} ${person.last_name}
          </h3>
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">
            📍 ${location.label}
          </p>
          <p style="margin: 0; font-size: 13px; color: #888; line-height: 1.4;">
            ${person.bio}
          </p>
        </div>
      `);

      // Add marker to map with popup
      const marker = new Marker({ element: el }).setLngLat(lngLat).setPopup(popup).addTo(map);

      // Store marker and element references by person and location
      const key = `${person.id}-${location.id}`;
      markersRef.current[key] = marker;
      markerElementsRef.current[key] = el;
    });

    return () => {
      map.remove();
    };
  }, []);

  // Handle person selection from search
  useEffect(() => {
    // Reset all markers to default state
    Object.values(markerElementsRef.current).forEach((el) => {
      el.classList.remove(styles.markerHighlighted);
      el.classList.remove(styles.markerDimmed);
    });

    if (!selectedPerson || !mapRef.current) return;

    // Find all locations for the selected person
    const personLocations = locationsWithPeople.filter(
      (loc) => loc.person.id === selectedPerson.id
    );

    if (personLocations.length === 0) return;

    // Highlight selected person's markers and dim others
    Object.entries(markerElementsRef.current).forEach(([key, el]) => {
      const personId = parseInt(el.dataset.personId);
      if (personId === selectedPerson.id) {
        el.classList.add(styles.markerHighlighted);
      } else {
        el.classList.add(styles.markerDimmed);
      }
    });

    // If person has only one location, fly to it
    if (personLocations.length === 1) {
      const location = personLocations[0];
      mapRef.current.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 12,
        duration: 2000,
      });

      // Open the popup for this marker
      const key = `${selectedPerson.id}-${location.id}`;
      const marker = markersRef.current[key];
      if (marker) {
        marker.togglePopup();
      }
    } else {
      // If person has multiple locations, fit bounds to show all
      const bounds = new maplibregl.LngLatBounds();
      personLocations.forEach((loc) => {
        bounds.extend([loc.longitude, loc.latitude]);
      });

      mapRef.current.fitBounds(bounds, {
        padding: 100,
        duration: 2000,
      });
    }
  }, [selectedPerson]);

  return (
    <div className={styles.container}>
      <div ref={mapContainerRef} className={styles.mapContainer} />
      <div className={styles.searchBarOverlay}>
        <SearchBar people={people} onSelectPerson={setSelectedPerson} />
      </div>
    </div>
  );
}
