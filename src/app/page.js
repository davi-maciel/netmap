"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import maplibregl, { Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Supercluster from "supercluster";
import { forceSimulation, forceCollide, forceX, forceY } from "d3-force";
import styles from "./page.module.css";
import { getLocationsWithPeople, getPersonById, getPeopleWithLocations } from "@/lib/api";
import SearchBar from "./SearchBar";
import PersonDetailsCard from "./PersonDetailsCard";
import AddPersonButton from "./AddPersonButton";
import AddPersonCard from "./AddPersonCard";
import Notification from "./Notification";
import LogoutButton from "./LogoutButton";
import ZoomControls from "./ZoomControls";
import { supabase } from '@/lib/supabase';
import { addPerson } from '@/lib/api';
import { updatePerson } from '@/lib/api';

export default function Home() {
  const router = useRouter();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const markerElementsRef = useRef({});
  const mapInitializedRef = useRef(false); // Track if map has been initialized
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [detailedPerson, setDetailedPerson] = useState(null); // For the details card
  const [isAddPersonOpen, setIsAddPersonOpen] = useState(false);
  const [notification, setNotification] = useState(null); // {message, type}
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [people, setPeople] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [locationsWithPeople, setLocationsWithPeople] = useState([])

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      setIsAuthenticated(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [router]);

  // Load people data
  useEffect(() => {
    async function loadData() {
      if (!isAuthenticated) return

      try {
        const data = await getPeopleWithLocations()
        setPeople(data)
      } catch (error) {
        console.error('Failed to load data:', error)
      }
    }

    loadData()
  }, [isAuthenticated])

  useEffect(() => {
    async function loadLocations() {
      if (!isAuthenticated) return

      try {
        const data = await getLocationsWithPeople()
        setLocationsWithPeople(data)
      } catch (error) {
        console.error('Failed to load locations:', error)
      }
    }

    loadLocations()
  }, [isAuthenticated, people]) // Reload when people change

  // Map initialization - always called, but only runs if authenticated
  useEffect(() => {
    if (!isAuthenticated || !mapContainerRef.current || mapInitializedRef.current) return;

    mapInitializedRef.current = true; // Mark as initialized

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

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapInitializedRef.current = false;
      }
    };
  }, [isAuthenticated]); // Only depend on auth status

  // Add markers with clustering whenever locationsWithPeople changes
  useEffect(() => {
    if (!mapRef.current || locationsWithPeople.length === 0) return;

    const map = mapRef.current;

    // Create supercluster index
    const supercluster = new Supercluster({
      radius: 60, // Cluster radius in pixels
      maxZoom: 12, // Max zoom to cluster points on (lower = breaks apart sooner)
    });

    // Convert locations to GeoJSON features with circular packing for duplicates
    // Group locations by coordinates
    const locationGroups = {};
    locationsWithPeople.forEach((location) => {
      const key = `${location.longitude},${location.latitude}`;
      if (!locationGroups[key]) {
        locationGroups[key] = [];
      }
      locationGroups[key].push(location);
    });

    // Apply circular packing to each group
    const points = [];
    Object.entries(locationGroups).forEach(([coordKey, locations]) => {
      const [lng, lat] = coordKey.split(',').map(Number);

      if (locations.length === 1) {
        // Single location, no offset needed
        points.push({
          type: "Feature",
          properties: {
            personId: locations[0].person.id,
            personName: `${locations[0].person.first_name} ${locations[0].person.last_name}`,
            profilePicture: locations[0].person.profile_picture_url || 'https://i.pravatar.cc/200?img=1',
            locationId: locations[0].id,
          },
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        });
      } else {
        // Multiple locations, use d3-force for circular packing
        const nodes = locations.map((location, i) => ({
          x: 0,
          y: 0,
          location,
        }));

        // Run force simulation
        forceSimulation(nodes)
          .force("x", forceX(0).strength(0.5))
          .force("y", forceY(0).strength(0.5))
          .force("collide", forceCollide(0.001).strength(1)) // Collision radius in degrees (~150m)
          .stop()
          .tick(50); // Run more iterations for better settling

        // Convert packed positions to GeoJSON points
        nodes.forEach((node) => {
          points.push({
            type: "Feature",
            properties: {
              personId: node.location.person.id,
              personName: `${node.location.person.first_name} ${node.location.person.last_name}`,
              profilePicture: node.location.person.profile_picture_url || 'https://i.pravatar.cc/200?img=1',
              locationId: node.location.id,
            },
            geometry: {
              type: "Point",
              coordinates: [lng + node.x, lat + node.y],
            },
          });
        });
      }
    });

    supercluster.load(points);

    // Function to update markers based on current zoom
    function updateMarkers() {
      const zoom = Math.floor(map.getZoom());
      const bounds = map.getBounds();
      const bbox = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ];

      const clusters = supercluster.getClusters(bbox, zoom);

      // Clear existing markers
      Object.values(markersRef.current).forEach(marker => marker.remove());
      markersRef.current = {};
      markerElementsRef.current = {};

      clusters.forEach((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;
        const isCluster = cluster.properties.cluster;

        if (isCluster) {
          // Create cluster marker
          const count = cluster.properties.point_count;
          const el = document.createElement("div");
          el.className = "cluster-marker";
          el.style.width = "70px";
          el.style.height = "70px";
          el.style.borderRadius = "50%";
          el.style.backgroundColor = "#eff6ff";
          el.style.color = "#1d4ed8";
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.fontSize = "18px";
          el.style.fontWeight = "bold";
          el.style.cursor = "pointer";
          el.style.border = "3px solid white";
          el.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.3)";
          el.textContent = count;

          // Click to zoom into cluster
          el.addEventListener("click", () => {
            const expansionZoom = Math.min(
              supercluster.getClusterExpansionZoom(cluster.id),
              20
            );
            map.flyTo({
              center: [lng, lat],
              zoom: expansionZoom,
              duration: 1000,
            });
          });

          const marker = new Marker({ element: el })
            .setLngLat([lng, lat])
            .addTo(map);

          markersRef.current[`cluster-${cluster.id}`] = marker;
        } else {
          // Create individual marker
          const { personId, profilePicture } = cluster.properties;
          const el = document.createElement("div");
          el.className = styles.marker;
          el.style.backgroundImage = `url(${profilePicture})`;
          el.style.width = "70px";
          el.style.height = "70px";
          el.dataset.personId = personId;

          // Add click handler to show person details
          el.addEventListener("click", async (e) => {
            e.stopPropagation();
            const personWithLocations = await getPersonById(personId);
            setDetailedPerson(personWithLocations);
          });

          const marker = new Marker({ element: el })
            .setLngLat([lng, lat])
            .addTo(map);

          const key = `${personId}-${cluster.properties.locationId}`;
          markersRef.current[key] = marker;
          markerElementsRef.current[key] = el;
        }
      });
    }

    // Initial render
    updateMarkers();

    // Update on zoom/move
    map.on("zoom", updateMarkers);
    map.on("move", updateMarkers);

    return () => {
      map.off("zoom", updateMarkers);
      map.off("move", updateMarkers);
    };
  }, [locationsWithPeople]); // Re-run when locations change

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

  // Don't render map until authenticated (after all hooks are called)
  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div ref={mapContainerRef} className={styles.mapContainer} />
      <div className={styles.searchBarOverlay}>
        <SearchBar people={people} onSelectPerson={setSelectedPerson} />
        <PersonDetailsCard
          person={detailedPerson}
          onClose={() => setDetailedPerson(null)}
          onSave={async (updatedPerson) => {
            try {
              await updatePerson(updatedPerson.id, {
                firstName: updatedPerson.first_name,
                lastName: updatedPerson.last_name,
                bio: updatedPerson.bio,
                locations: updatedPerson.locations,
                profilePicture: updatedPerson.profilePictureFile // Pass the file for upload
              })

              // Refresh data
              const updatedPeople = await getPeopleWithLocations()
              setPeople(updatedPeople)

              const updatedLocations = await getLocationsWithPeople()
              setLocationsWithPeople(updatedLocations)

              setNotification({
                message: `${updatedPerson.first_name} ${updatedPerson.last_name} updated successfully!`,
                type: "success"
              })
            } catch (error) {
              console.error('Error updating person:', error)
              setNotification({
                message: "Failed to update person.",
                type: "error"
              })
            }
          }}
        />
      </div>
      {isAddPersonOpen ? (
        <AddPersonCard
          onClose={() => setIsAddPersonOpen(false)}
          onAdd={async (data) => {
            try {
              const newPerson = await addPerson(data)

              // Refresh data
              const updatedPeople = await getPeopleWithLocations()
              setPeople(updatedPeople)

              const updatedLocations = await getLocationsWithPeople()
              setLocationsWithPeople(updatedLocations)

              setNotification({
                message: `${data.firstName} ${data.lastName} added successfully!`,
                type: "success"
              })
              setIsAddPersonOpen(false)
            } catch (error) {
              console.error('Error adding person:', error)
              setNotification({
                message: "Failed to add person. Please try again.",
                type: "error"
              })
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
          <LogoutButton onClick={async () => {
            await supabase.auth.signOut()
            router.push("/login")
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
