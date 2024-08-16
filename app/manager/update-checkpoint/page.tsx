"use client";

import { FC, useState, useEffect } from "react";
import UpdateCheckpointForm from "./UpdateCheckpointForm"; // Assuming you have this form
import Web3 from "web3";
import { idManagementAddress } from "../../web3/client";
import idManagementABI from "../../web3/abis/idManagement.json";
import Loader from "@/components/Loader";
import { ethers } from "ethers";
import { keccak256 } from "ethers"; // Ethers.js keccak256

const MANAGER_ROLE = keccak256(ethers.toUtf8Bytes("MANAGER_ROLE")); // Hashing the MANAGER_ROLE

const ManagerRolePage: FC = () => {
  const [isManager, setIsManager] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkManagerRole = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(
            idManagementABI,
            idManagementAddress
          );

          const accounts = await web3.eth.requestAccounts();
          const account = accounts[0];

          const hasRole = await contract.methods
            .hasRole(MANAGER_ROLE, account)
            .call();

          setIsManager(hasRole);
        } else {
          console.error("Ethereum wallet is not available");
          setIsManager(false);
        }
      } catch (error) {
        console.error("Error checking Manager role:", error);
        setIsManager(false);
      } finally {
        setLoading(false);
      }
    };

    checkManagerRole();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!isManager) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600">Access Denied</h1>
          <p className="text-gray-700">You do not have Manager permissions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-semibold text-gray-700 text-center mb-8 mt-24">
        Update Checkpoint
      </h1>
      <div className="flex justify-center">
        <UpdateCheckpointForm />
      </div>
    </div>
  );
};

export default ManagerRolePage;
