"use client";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { checkpointManagementAddress } from "../../web3/client";
import checkpointManagementABI from "../../web3/abis/checkpointManagement.json";
import Loader from "@/components/Loader";

interface Checkpoint {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  active: boolean;
  allowedRoles: string[];
  timestamp: number;
}

const CheckpointListPage: React.FC = () => {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentAccount, setCurrentAccount] = useState<string>("");

  useEffect(() => {
    const loadCheckpoints = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(
            checkpointManagementABI,
            checkpointManagementAddress
          );

          const accounts = await web3.eth.requestAccounts();
          setCurrentAccount(accounts[0]);

          const data: any = await contract.methods.getAllCheckpoints().call();

          // Parsing checkpoint data
          const parsedCheckpoints: Checkpoint[] = data[0].map(
            (index: number) => ({
              id: Number(index),
              name: data[1][index],
              latitude: data[2][index],
              longitude: data[3][index],
              active: data[4][index],
              timestamp: data[5][index],
              allowedRoles: data[6][index],
            })
          );

          setCheckpoints(parsedCheckpoints);
        }
      } catch (error) {
        console.error("Error loading checkpoints:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCheckpoints();
  }, []);

  const handleAttemptAccess = async (checkpointId: number) => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
          checkpointManagementABI,
          checkpointManagementAddress
        );
        console.log(currentAccount, checkpointId);

        await contract.methods
          .attemptAccess(currentAccount, checkpointId)
          .send({
            from: currentAccount,
          });

        alert(`Access attempt made for checkpoint ID ${checkpointId}`);
      }
    } catch (error) {
      console.error("Error attempting access:", error);
      alert("Access attempt failed.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-semibold text-gray-700 text-center mb-8">
        Checkpoint List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checkpoints.map((checkpoint) => (
          <div key={checkpoint.id} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold">{checkpoint.name}</h2>
            <p>Checkpoint Number: {checkpoint.id}</p>
            <p>Latitude: {checkpoint.latitude}</p>
            <p>Longitude: {checkpoint.longitude}</p>
            <p>Status: {checkpoint.active ? "Active" : "Inactive"}</p>
            <p>Allowed Roles: {checkpoint.allowedRoles.join(", ")}</p>
            <button
              onClick={() => handleAttemptAccess(checkpoint.id)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Attempt Access
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckpointListPage;
