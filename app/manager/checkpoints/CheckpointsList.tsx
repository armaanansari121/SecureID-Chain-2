"use client";

import { FC, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Web3 from "web3";
import { checkpointManagementAddress } from "../../web3/client";
import checkpointManagementABI from "../../web3/abis/checkpointManagement.json";

interface Checkpoint {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  active: boolean;
  allowedRoles: string[];
  timestamp: number;
}

const CheckpointsList: FC = () => {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);

  useEffect(() => {
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

          const parsedCheckpoints = data[0].map(
            (id: number, index: number) => ({
              id,
              name: data[1][index],
              latitude: data[2][index],
              longitude: data[3][index],
              active: data[4][index],
              timestamp: data[5][index],
              allowedRoles: data[6][index], // Assign allowed roles from the 2D array
            })
          );

          setCheckpoints(parsedCheckpoints);
        } else {
          console.error("Ethereum wallet is not available");
        }
      } catch (error) {
        console.error("Error fetching checkpoints:", error);
      }
    };

    fetchCheckpoints();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Checkpoints</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {checkpoints.length > 0 ? (
          checkpoints.map((checkpoint) => (
            <Card key={checkpoint.id} className="p-4 h-48">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{checkpoint.name}</h2>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    checkpoint.active ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {checkpoint.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-gray-600">Latitude: {checkpoint.latitude}</p>
              <p className="text-gray-600">Longitude: {checkpoint.longitude}</p>
              <p className="text-gray-600">Roles:</p>
              <ul className="list-disc list-inside text-gray-600">
                {checkpoint.allowedRoles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>

              <p className="text-gray-400 text-sm">
                Last Updated:{" "}
                {new Date(Number(checkpoint.timestamp) * 1000).toLocaleString()}
              </p>
            </Card>
          ))
        ) : (
          <p>No checkpoints found.</p>
        )}
      </div>
    </div>
  );
};

export default CheckpointsList;
