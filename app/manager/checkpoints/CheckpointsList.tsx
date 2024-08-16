"use client";

import { FC, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Web3 from "web3";
import { checkpointManagementAddress } from "../../web3/client";
import checkpointManagementABI from "../../web3/abis/checkpointManagement.json";

interface Checkpoint {
  id: number;
  name: string;
  location: string;
  active: boolean;
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

          const parsedCheckpoints = data[0].map(
            (id: number, index: number) => ({
              id,
              name: data[1][index],
              location: data[2][index],
              active: data[3][index],
              timestamp: data[4][index],
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
            <Card key={checkpoint.id} className="p-4 h-32">
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
              <p className="text-gray-600">{checkpoint.location}</p>
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
