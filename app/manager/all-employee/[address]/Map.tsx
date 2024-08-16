// components/Map.tsx
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Loader from "@/components/Loader";

// Dynamically load react-leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Define the type for our location history
interface Location {
  latitude: string;
  longitude: string;
  timestamp: string;
  checkpointId: number;
}

interface MapProps {
  locationHistory: Location[];
}

const Map: React.FC<MapProps> = ({ locationHistory }) => {
  const [mapKey, setMapKey] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMapKey(1);
    setLoading(false);
  }, []);

  // Custom icon (optional)
  const customIcon = new Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        height: "calc(100vh)",
        width: "100%",
        position: "relative",
        zIndex: 10,
      }}
    >
      {typeof window !== "undefined" && (
        <MapContainer
          key={mapKey}
          center={[51.505, -0.09]}
          zoom={3}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locationHistory.map((location, index) => (
            <Marker
              key={index}
              position={[
                parseFloat(location.latitude),
                parseFloat(location.longitude),
              ]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold">
                    Checkpoint ID: {location.checkpointId}
                  </h3>
                  <p>Latitude: {location.latitude}</p>
                  <p>Longitude: {location.longitude}</p>
                  <p>Timestamp: {location.timestamp}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
