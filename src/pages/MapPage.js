import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback } from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./styles/MapPage.css";
import mylocation from "../assets/mylocation.svg";
import pinlocation from "../assets/pinlocation.svg";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const mapStyles = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "landscape.man_made", stylers: [{ visibility: "off" }] },

  // Roads - Seamless and integrated with subtle differentiation
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ebe2f6" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#4f378a" }] },
  { featureType: "road", elementType: "labels.text.stroke", stylers: [{ color: "#f9f5fc" }] },

  // Administrative elements - Adding soft purple tones for boundaries
  { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#c0aacb" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#e0c4f4" }] },

  // Natural landscapes - Keep a muted, polished background
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#f5ebf9" }] },

  // Water - Vibrant with a soft gradient effect
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#cec3f1" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#4f378a" }] },

  // Highways - Distinctive to stand out, softer integration
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#d5c5ed" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#4f378a" }] },

  // City labels - Prominent and clean
  { featureType: "city", elementType: "labels.text.fill", stylers: [{ color: "#4f378a" }] },

  // Additional enhancements for a polished look
  { featureType: "landscape.natural", elementType: "geometry.fill", stylers: [{ color: "#f9f6fc" }] },
  { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#efe6f9" }] },
];


const DEFAULT_LOCATION = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco

const GoogleMapsPage = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(
    sessionStorage.getItem("locationPermissionGranted") === "true"
  );

  const fetchCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
          if (mapRef) {
            mapRef.panTo(location);
            mapRef.setZoom(18);
          }
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setDefaultLocation();
    }
  }, [mapRef]);
  

  const setDefaultLocation = () => {
    setCurrentLocation(DEFAULT_LOCATION);
  };

  useEffect(() => {
    if (!hasRequestedLocation) {
      const askForPermission = () => {
        const userConsent = window.confirm(
          "This site wants to access your location to display it on the map. Do you allow access?"
        );
        if (userConsent) {
          sessionStorage.setItem("locationPermissionGranted", "true");
          setHasRequestedLocation(true);
          fetchCurrentLocation();
        } else {
          alert("Location access denied. Default location will be used.");
          setDefaultLocation();
        }
      };
  
      askForPermission();
    } else if (!currentLocation) {
      // Fetch location automatically if permission has already been granted
      fetchCurrentLocation();
    }
  }, [hasRequestedLocation, currentLocation, fetchCurrentLocation]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="google-maps-layout">
      <Header />
      <div className="content-wrapper">
        <Navbar />
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation || DEFAULT_LOCATION}
            zoom={15}
            options={{
              styles: mapStyles,
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMapRef(map)}
          >
            {currentLocation && (
              <Marker
                position={currentLocation}
                icon={{
                  url: mylocation,
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
              />
            )}
          </GoogleMap>
        </div>
        <div className="map-button-container">
          <button
            onClick={fetchCurrentLocation}
            className="pin-location-button"
            aria-label="Pin My Location"
          >
            <img src={pinlocation} alt="Pin Location" className="pin-location-icon" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GoogleMapsPage;
