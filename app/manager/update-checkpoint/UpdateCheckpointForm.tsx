"use client";

import { FC, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Web3 from "web3";
import { checkpointManagementAddress } from "../../web3/client";
import checkpointManagementABI from "../../web3/abis/checkpointManagement.json";

const UpdateCheckpointForm: FC = () => {
  const [checkpointId, setCheckpointId] = useState<number>(0);
  const [active, setActive] = useState<string>("true");
  const [newRoles, setNewRoles] = useState<string>("");
  const [newLatitude, setNewLatitude] = useState<string>("");
  const [newLongitude, setNewLongitude] = useState<string>("");

  const handleUpdateCheckpoint = async (e: any) => {
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
        const rolesArray = newRoles.split(",").map((role) => role.trim());
        await contract.methods
          .updateCheckpoint(
            checkpointId,
            active === "true",
            rolesArray,
            newLatitude,
            newLongitude
          )
          .send({ from: account });

        console.log("Checkpoint updated successfully");
      } else {
        console.error("Ethereum wallet is not available");
      }
    } catch (error) {
      console.error("Error updating checkpoint:", error);
    }
  };

  return (
    <Card className="w-1/2 p-6">
      <form onSubmit={handleUpdateCheckpoint}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Checkpoint ID
          </label>
          <Input
            type="number"
            placeholder="Enter checkpoint ID"
            value={checkpointId}
            onChange={(e) => setCheckpointId(Number(e.target.value))}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Active Status
          </label>
          <Select onValueChange={(value) => setActive(value)}>
            <SelectTrigger className="mt-1 block w-full">
              <SelectValue placeholder="Select a Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            New Roles (comma-separated)
          </label>
          <Input
            type="text"
            placeholder="Enter new roles"
            value={newRoles}
            onChange={(e) => setNewRoles(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            New Latitude
          </label>
          <Input
            type="text"
            placeholder="Enter new latitude"
            value={newLatitude}
            onChange={(e) => setNewLatitude(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            New Longitude
          </label>
          <Input
            type="text"
            placeholder="Enter new longitude"
            value={newLongitude}
            onChange={(e) => setNewLongitude(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <Button className="mt-4 w-full" type="submit">
          Update Checkpoint
        </Button>
      </form>
    </Card>
  );
};

export default UpdateCheckpointForm;
