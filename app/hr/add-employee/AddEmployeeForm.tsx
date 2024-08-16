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
import { idManagementAddress } from "../../web3/client";
import idManagementABI from "../../web3/abis/idManagement.json";

const roles = [
  { label: "Driver", value: "DRIVER_ROLE" },
  { label: "Guard", value: "GUARD_ROLE" },
];

import { JWT_SECRET_ACCESS_TOKEN } from "../../../config";

const AddEmployeeForm: FC = () => {
  const [employeeName, setEmployeeName] = useState<string>("");
  const [employeeRole, setEmployeeRole] = useState<string>("");
  const [employeeAddress, setEmployeeAddress] = useState<string>("");
  const [employeeImage, setEmployeeImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT_SECRET_ACCESS_TOKEN}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image to IPFS");
      }

      const resData = await res.json();
      return resData.IpfsHash;
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      return null;
    }
  };

  const handleAddEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!employeeImage) {
      alert("Please upload an image");
      return;
    }

    setIsLoading(true);

    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const ipfsHash = await handleImageUpload(employeeImage);

        if (!ipfsHash) {
          throw new Error("Failed to upload image to IPFS");
        }

        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
          idManagementABI,
          idManagementAddress
        );

        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];

        await contract.methods
          .addEmployee(employeeName, employeeRole, employeeAddress, ipfsHash)
          .send({ from: account });

        alert("Employee added successfully");
        // Reset form fields
        setEmployeeName("");
        setEmployeeRole("");
        setEmployeeAddress("");
        setEmployeeImage(null);
      } else {
        throw new Error("Ethereum wallet is not available");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert(`Error adding employee: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleAddEmployee}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="employeeName">
              Employee Name
            </label>
            <Input
              id="employeeName"
              type="text"
              placeholder="Enter name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="employeeRole">
              Employee Role
            </label>
            <Select onValueChange={(value) => setEmployeeRole(value)} required>
              <SelectTrigger id="employeeRole">
                <SelectValue placeholder="Select a Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="employeeAddress">
              Employee Address
            </label>
            <Input
              id="employeeAddress"
              type="text"
              placeholder="0x..."
              value={employeeAddress}
              onChange={(e) => setEmployeeAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="employeeImage">
              Profile Image
            </label>
            <Input
              id="employeeImage"
              type="file"
              accept="image/*"
              onChange={(e) => setEmployeeImage(e.target.files?.[0] || null)}
              required
            />
          </div>
        </div>
        <Button className="mt-6 w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Adding Employee..." : "Add Employee"}
        </Button>
      </form>
    </Card>
  );
};

export default AddEmployeeForm;