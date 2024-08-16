"use client";

import { FC, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Web3 from "web3";
import { checkpointManagementAddress } from "../../web3/client";
import checkpointManagementABI from "../../web3/abis/checkpointManagement.json";

const AddCheckpointForm: FC = () => {
  const [checkpointName, setCheckpointName] = useState<string>("");
  const [checkpointLocation, setCheckpointLocation] = useState<string>("");
  const [allowedRoles, setAllowedRoles] = useState<string>("");

  const handleAddCheckpoint = async (e: any) => {
    e.preventDefault();
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
          checkpointManagementABI,
          checkpointManagementAddress
        );

        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];

        // Splitting allowedRoles string into an array
        const rolesArray = allowedRoles.split(",").map((role) => role.trim());

        await contract.methods
          .addCheckpoint(checkpointName, checkpointLocation, rolesArray)
          .send({ from: account });

        console.log("Checkpoint added successfully");
      } else {
        console.error("Ethereum wallet is not available");
      }
    } catch (error) {
      console.error("Error adding checkpoint:", error);
    }
  };

  return (
    <Card className="w-1/2 p-6">
      <form onSubmit={handleAddCheckpoint}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Checkpoint Name
          </label>
          <Input
            type="text"
            placeholder="Enter checkpoint name"
            value={checkpointName}
            onChange={(e) => setCheckpointName(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Checkpoint Location
          </label>
          <Input
            type="text"
            placeholder="Enter checkpoint location"
            value={checkpointLocation}
            onChange={(e) => setCheckpointLocation(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Allowed Roles (comma-separated)
          </label>
          <Input
            type="text"
            placeholder="Enter allowed roles"
            value={allowedRoles}
            onChange={(e) => setAllowedRoles(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <Button className="mt-4 w-full" type="submit">
          Add Checkpoint
        </Button>
      </form>
    </Card>
  );
};

export default AddCheckpointForm;
