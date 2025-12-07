"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./page.module.css";
import { getLocationsWithPeople, people, getPersonById } from "@/data/mockData";
import SearchBar from "./SearchBar";
import PersonDetailsCard from "./PersonDetailsCard";
import AddPersonButton from "./AddPersonButton";
import AddPersonCard from "./AddPersonCard";
import Notification from "./Notification";
import LogoutButton from "./LogoutButton";
import ZoomControls from "./ZoomControls";

export default function Home() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const markerElementsRef = useRef({});
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [detailedPerson, setDetailedPerson] = useState(null); // For the details card
  const [isAddPersonOpen, setIsAddPersonOpen] = useState(false);
  const [notification, setNotification] = useState(null); // {message, type}
  const locationsWithPeople = getLocationsWithPeople();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://tiles.openfreemap.org/styles/bright",
      center: [0, 20],
      zoom: 2,
      attributionControl: false, // Remove attribution control
      dragRotate: false, // Disable map rotation
    });

    mapRef.current = map;

    // Customize map style once loaded
    map.on("style.load", () => {
      // Hide most labels except for country and state names
      const layers = map.getStyle().layers;
      layers.forEach((layer) => {
        if (layer.type === "symbol") {
          // Keep country and state/province labels visible
          if (
            layer.id.includes("place") ||
            layer.id.includes("country") ||
            layer.id.includes("state")
          ) {
          } else {
            // Hide everything else (roads, POIs, etc.)
            map.setLayoutProperty(layer.id, "visibility", "none");
          }
        }
      });
    });



    // Clear selection when clicking on the map
    map.on("click", () => {
      setSelectedPerson(null);
      setDetailedPerson(null);
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

      // Add click handler to show person details
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("Marker clicked for person ID:", person.id);
        const personWithLocations = getPersonById(person.id);
        console.log("Person with locations:", personWithLocations);
        setDetailedPerson(personWithLocations);
      });

      // Add marker to map
      const marker = new Marker({ element: el }).setLngLat(lngLat).addTo(map);

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

    // Update the detailed person card
    const personWithLocations = getPersonById(selectedPerson.id);
    setDetailedPerson(personWithLocations);
  }, [selectedPerson]);

  return (
    <div className={styles.container}>
      <div ref={mapContainerRef} className={styles.mapContainer} />
      <div className={styles.searchBarOverlay}>
        <SearchBar people={people} onSelectPerson={setSelectedPerson} />
        <PersonDetailsCard
          person={detailedPerson}
          onClose={() => setDetailedPerson(null)}
          onSave={(updatedPerson) => {
            console.log("Updated person data:", updatedPerson);

            // TODO: Replace with actual database update
            // For now, just update the detailed person state and show notification
            setDetailedPerson(updatedPerson);
            setNotification({
              message: `${updatedPerson.first_name} ${updatedPerson.last_name} updated successfully!`,
              type: "success"
            });
          }}
        />
      </div>
      {isAddPersonOpen ? (
        <AddPersonCard
          onClose={() => setIsAddPersonOpen(false)}
          onAdd={(data) => {
            console.log("New person data:", data);

            // Simulate async operation (e.g., database save)
            try {
              // TODO: Replace with actual database save
              // For now, just validate and show success
              if (data.firstName && data.lastName && data.locations.length > 0) {
                setNotification({
                  message: `${data.firstName} ${data.lastName} added successfully!`,
                  type: "success"
                });
                setIsAddPersonOpen(false);
              } else {
                throw new Error("Missing required fields");
              }
            } catch (error) {
              setNotification({
                message: "Failed to add person. Please try again.",
                type: "error"
              });
            }
          }}
        />
      ) : (
        <>
          <AddPersonButton onClick={() => setIsAddPersonOpen(true)} />
          <ZoomControls
            onZoomIn={() => mapRef.current?.zoomIn()}
            onZoomOut={() => mapRef.current?.zoomOut()}
          />
          <LogoutButton onClick={() => {
            console.log("Logout clicked");
            // TODO: Implement actual logout functionality with Supabase
            setNotification({
              message: "Logout functionality coming soon!",
              type: "success"
            });
          }} />
        </>
      )}

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
