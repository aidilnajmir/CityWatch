import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Navbar from "../components/Navbar/Navbar"; // Sidebar Navbar
import Header from "../components/Header"; // Optional Header
import Footer from "../components/Footer"; // Optional Footer
import "./styles/GoogleMapsPage.css";

const containerStyle = {
  width: "100%",
  height: "100%", // Occupy remaining vertical space
};

// Custom map styles to hide unrelated features and change the theme
const mapStyles = [
  {
    featureType: "poi", // Points of Interest
    stylers: [{ visibility: "off" }], // Hide all POI
  },
  {
    featureType: "transit", // Transit features
    stylers: [{ visibility: "off" }], // Hide transit features
  },
  {
    featureType: "landscape.man_made", // Man-made structures
    stylers: [{ visibility: "off" }], // Hide man-made features
  },
  {
    featureType: "road", // Roads
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }], // Light gray roads
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }], // Medium gray text for road names
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ffffff" }], // White background for road text
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }], // Light gray administrative labels
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#dadada" }], // Subtle boundaries
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#e0e0e0" }], // Soft gray background for natural areas
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9e7f1" }], // Light blue water
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#929292" }], // Subtle labels for water
  },
  {
    featureType: "city",
    elementType: "labels.text.fill",
    stylers: [{ color: "#444444" }], // Darker text for city names
  },
];


const GoogleMapsPage = () => {
  const { isLoaded } = useJsApiLoader({
//    googleMapsApiKey: "AIzaSyD039tCXaZr-04tI78gv2H5oYC-PjLcJz8",
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  // Function to fetch the current location
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
          if (mapRef) {
            mapRef.panTo(location); // Recenter the map
          }
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Location access denied by the user.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get your location timed out.");
              break;
            default:
              alert("An unknown error occurred while fetching your location.");
              break;
          }
          setCurrentLocation({
            lat: 37.7749, // Default to San Francisco
            lng: -122.4194,
          });
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setCurrentLocation({
        lat: 37.7749, // Default to San Francisco
        lng: -122.4194,
      });
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="google-maps-layout">
      {/* Header */}
      <Header />

      <div className="content-wrapper">
        {/* Sidebar Navbar */}
        <Navbar />

        {/* Google Maps */}
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation || { lat: 37.7749, lng: -122.4194 }}
            zoom={15}
            options={{ styles: mapStyles }}
            onLoad={(map) => setMapRef(map)} // Save map reference
          >
            {currentLocation && <Marker position={currentLocation} />}
          </GoogleMap>
        </div>

        {/* Button to recenter and pin the location */}
        <div className="map-button-container">
          <button onClick={fetchCurrentLocation} className="pin-location-button">
            Pin My Location
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GoogleMapsPage;
