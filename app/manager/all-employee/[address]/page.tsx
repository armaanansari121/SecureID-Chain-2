// manager/all-employee/[address]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Web3 from "web3";
import Loader from "@/components/Loader";
import idManagementABI from "../../../web3/abis/idManagement.json";
import { idManagementAddress } from "../../../web3/client";

// Dynamically load the Map component
const Map = dynamic(() => import("./Map.tsx"), { ssr: false });

const EmployeePage = () => {
  const { address } = useParams(); // Extract the address from the URL
  const [locationHistory, setLocationHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(typeof address);
    if (address) {
      fetchLocationHistory(address);
    }
  }, [address]);

  const fetchLocationHistory = async (employeeAddress: string) => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
          idManagementABI,
          idManagementAddress
        );
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];

        // Fetch the location history from the smart contract
        const data = await contract.methods
          .getLocationHistory(employeeAddress)
          .call({ from: account });

        const { latitudes, longitudes, timestamps, checkpointIds } = data;

        // Parse the data into a readable format
        const parsedLocations = latitudes.map(
          (latitude: string, index: number) => ({
            latitude,
            longitude: longitudes[index],
            timestamp: new Date(
              Number(timestamps[index]) * 1000
            ).toLocaleString(),
            checkpointId: Number(checkpointIds[index]),
          })
        );
        console.log(parsedLocations);

        setLocationHistory(parsedLocations);
      } else {
        console.error("Ethereum wallet is not available");
      }
    } catch (error) {
      console.error("Error fetching location history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Employee Details for Address: {address}</h1>
      {/* Display the Map and pass the location history as props */}
      <Map locationHistory={locationHistory} />
    </div>
  );
};

export default EmployeePage;
