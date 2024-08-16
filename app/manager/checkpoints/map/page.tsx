"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Web3 from "web3";
import { checkpointManagementAddress } from "../../../web3/client";
import checkpointManagementABI from "../../../web3/abis/checkpointManagement.json";
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

// Define the type for our checkpoint details
interface Checkpoint {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  active: boolean;
  timestamp: number;
  allowedRoles: string[];
}

const Map: React.FC = () => {
  const [mapKey, setMapKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState<Checkpoint[]>([]);

  useEffect(() => {
    setMapKey(1);
    fetchCheckpoints();
  }, []);

  const fetchCheckpoints = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
          checkpointManagementABI,
          checkpointManagementAddress
        );

        const data: any = await contract.methods.getAllCheckpoints().call();
        console.log(data);

        // Parse the checkpoint data
        const parsedCheckpoints = data[0].map((id: number, index: number) => ({
          id,
          name: data[1][index],
          latitude: data[2][index],
          longitude: data[3][index],
          active: data[4][index],
          timestamp: data[5][index],
          allowedRoles: data[6][index], // Assign allowed roles from the 2D array
        }));

        setPositions(parsedCheckpoints);
      } else {
        console.error("Ethereum wallet is not available");
      }
    } catch (error) {
      console.error("Error fetching checkpoints:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(positions);
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
          {positions.map((position) => (
            <Marker
              key={position.id}
              position={[
                parseFloat(position.latitude),
                parseFloat(position.longitude),
              ]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold">{position.name}</h3>
                  <p>Active: {position.active ? "Yes" : "No"}</p>
                  <p>
                    Timestamp:{" "}
                    {new Date(
                      Number(position.timestamp) * 1000
                    ).toLocaleString()}
                  </p>
                  <p>Allowed Roles: {position.allowedRoles.join(", ")}</p>
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
