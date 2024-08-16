"use client";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { idManagementAddress } from "../web3/client";
import idManagementABI from "../web3/abis/idManagement.json";
import Loader from "@/components/Loader";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { Gateway_url } from "@/config";
import { Button } from "@/components/ui/button";

interface LocationRecord {
  latitude: string;
  longitude: string;
  timestamp: string;
  checkpointId: string;
}

interface EmployeeDataFromContract {
  name: string;
  role: string;
  active: boolean;
  lastUpdated: string;
  certifications: string[];
  ipfsHash: string;
  locationHistory: LocationRecord[];
}

interface EmployeeData {
  name: string;
  role: string;
  active: boolean;
  lastUpdated: number;
  certifications: string[];
  ipfsHash: string;
  locationHistory: {
    latitude: string;
    longitude: string;
    timestamp: number;
    checkpointId: number;
  }[];
}

const EmployeeDetails: NextPage = () => {
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const loadEmployeeData = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });

          const accounts = await web3.eth.getAccounts();
          const employeeAddress = accounts[0];
          console.log("Employee address:", employeeAddress);

          const IdContract = new web3.eth.Contract(
            idManagementABI as any,
            idManagementAddress
          );

          const employeeData = (await IdContract.methods
            .getEmployee(employeeAddress)
            .call()) as EmployeeDataFromContract;

          setEmployee({
            name: employeeData.name,
            role: employeeData.role,
            active: employeeData.active,
            lastUpdated: Number(employeeData.lastUpdated),
            certifications: employeeData.certifications,
            ipfsHash: employeeData.ipfsHash,
            locationHistory: employeeData.locationHistory.map(
              (location: LocationRecord) => ({
                latitude: location.latitude,
                longitude: location.longitude,
                timestamp: Number(location.timestamp),
                checkpointId: Number(location.checkpointId),
              })
            ),
          });
        } catch (error) {
          console.error("Error fetching employee data:", error);
          setError(
            "Failed to fetch employee data. Please make sure you're connected with the correct account."
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("Please install and connect to a Web3 wallet like MetaMask.");
        setIsLoading(false);
      }
    };

    loadEmployeeData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md max-w-sm text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg shadow-md max-w-sm text-center">
          <h2 className="text-xl font-semibold mb-2">No Data Found</h2>
          <p>No employee data found for the connected address.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen pt-24">
      <Head>
        <title>Employee Details - SecureID Chain</title>
        <meta name="description" content="Employee details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Employee Details
        </h1>
        <Card className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {employee.name}
            </h2>
            <h3 className="text-xl text-gray-600 mb-4">{employee.role}</h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={`${Gateway_url}/ipfs/${employee.ipfsHash}`}
                alt="Employee Image"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Status:</strong> {employee.active ? "Active" : "Inactive"}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Last Updated:</strong>{" "}
              {new Date(employee.lastUpdated * 1000).toLocaleDateString()}
            </p>
            <div className="mb-6">
              <Button
                variant="outline"
                className="bg-blue-600 text-white mx-2"
                onClick={openModal}
              >
                View Certifications
              </Button>
              <a
                href="/employee-idcard/attempt-access"
                className="inline-block mx-2"
              >
                <Button variant="outline" className="bg-blue-600 text-white">
                  Attempt Access
                </Button>
              </a>
            </div>

            {isModalOpen && (
              <DialogOverlay onDismiss={closeModal} className="z-20 mt-20">
                <DialogContent
                  aria-label="Certifications"
                  className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Certifications:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4">
                    {employee.certifications.map((cert, index) => (
                      <li key={index}>
                        <Image
                          src={`${Gateway_url}/ipfs/${cert}`}
                          alt={`Certification ${index + 1}`}
                          width={300}
                          height={200}
                          objectFit="contain"
                        />
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="bg-blue-600 text-white mt-4"
                    onClick={closeModal}
                  >
                    Close
                  </Button>
                </DialogContent>
              </DialogOverlay>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default EmployeeDetails;
