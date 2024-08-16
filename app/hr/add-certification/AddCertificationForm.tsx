"use client";

import { FC, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Web3 from "web3";
import { idManagementAddress } from "../../web3/client";
import idManagementABI from "../../web3/abis/idManagement.json";

import { Gateway_url,JWT_SECRET_ACCESS_TOKEN } from "@/config";

const AddCertificationForm: FC = () => {
  const [employeeAddress, setEmployeeAddress] = useState<string>("");
  const [certificationFile, setCertificationFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadFileToIPFS = async (file: File | null): Promise<string | null> => {
    if (!file) {
      console.error("No file selected");
      return null;
    }

    setUploading(true);

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

      const resData = await res.json();
      const ipfsHash = resData.IpfsHash;

      setUploading(false);
      return ipfsHash;
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      setUploading(false);
      return null;
    }
    };

  const handleAddCertification = async (e: any) => {
    e.preventDefault();

    if (!certificationFile) {
      console.error("No certification file selected");
      return;
    }

    try {
      // Upload certification file to IPFS
      const ipfsHash = await uploadFileToIPFS(certificationFile);

      if (!ipfsHash) {
        console.error("Failed to upload the file to IPFS");
        return;
      }

      if (typeof window !== "undefined" && window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
          idManagementABI,
          idManagementAddress
        );

        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];

        // Store IPFS hash on the blockchain
        await contract.methods
          .addCertification(employeeAddress, ipfsHash)
          .send({ from: account });

        console.log("Certification added successfully");
      } else {
        console.error("Ethereum wallet is not available");
      }
    } catch (error) {
      console.error("Error adding certification:", error);
    }
  };



  return (
    <Card className="w-1/2 p-6">
      <form onSubmit={handleAddCertification}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Employee Address
          </label>
          <Input
            type="text"
            placeholder="0x..."
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Certification File
          </label>
          <Input
            type="file"
            onChange={(e) =>
              setCertificationFile(e.target.files ? e.target.files[0] : null)
            }
            className="mt-1 block w-full"
          />
        </div>
        <Button className="mt-4 w-full" type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Add Certification"}
        </Button>
      </form>
    </Card>
  );
};

export default AddCertificationForm;
