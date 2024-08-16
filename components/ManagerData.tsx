"use client";

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Modal from '../components/Modal';
import { idManagementAddress } from "../app/web3/client";
import idManagementABI from "../app/web3/abis/idManagement.json";
import { Gateway_url } from "@/config";
import Image from "next/image";
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
  role: string;
  lastUpdated: string; // Keep as string for easy handling in JSX
  employeeAddress: string;
  active: boolean;
}

interface ManagerDataProps {
  data: {
    employeeAddeds: Employee[];
  };
}

const ManagerData: React.FC<ManagerDataProps> = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [certificateList, setCertificateList] = useState<string[]>([]);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  console.log("contract", contract);
  console.log("data", data);

  useEffect(() => {
    const initWeb3 = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const contractInstance = new web3Instance.eth.Contract(
            idManagementABI as any,
            idManagementAddress
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Error initializing Web3", error);
        }
      }
    };

    initWeb3();
  }, []);

  const fetchCertificates = async (employeeAddress: string) => {
    if (!contract) {
      console.error("Contract not initialized");
      return [];
    }
  
    try {
      console.log("Fetching employee data for address:", employeeAddress);
      const employeeData = await contract.methods.getEmployee(employeeAddress).call();
      console.log("Employee data fetched:", employeeData);
      
      if (!employeeData || !employeeData.certifications) {
        console.error("No certifications found or employee data is null.");
        return [];
      }
  
      return employeeData.certifications;
    } catch (error) {
      console.error("Error fetching certificates:", error);
      return [];
    }
  };

  const handleModalOpen = async (employeeAddress: string, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default link behavior
    const certificates = await fetchCertificates(employeeAddress);
    setCertificateList(certificates);
    setIsModalVisible(true);
  };

  const handleModalClose = () => setIsModalVisible(false);

  // Helper function to convert epoch timestamp to human-readable date
  const convertTimestampToDate = (timestamp: string) => {
    const date = new Date(Number(timestamp) * 1000); // Convert to milliseconds
    return date.toLocaleString(); // Format date to local string
  };

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-40">
      {data.employeeAddeds.map((employee) => (
        <Link
          href={`/manager/all-employee/${employee.employeeAddress}`}
          key={employee.employeeAddress}
          className="block"
        >
          <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold">{employee.name}</h3>
            <p className="text-gray-600">
              <span className="font-medium">Role: </span>{employee.role}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Last Updated: </span>{convertTimestampToDate(employee.lastUpdated)}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Active: </span>{employee.active ? 'Yes' : 'No'}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={(e) => handleModalOpen(employee.employeeAddress, e)}
            >
              View Certificates
            </button>
          </div>
        </Link>
      ))}

      {isModalVisible && (
        <Modal isOpen={isModalVisible} onClose={handleModalClose} title="Employee Certificates">
          <div className="p-4">
            {certificateList.length > 0 ? (
              certificateList.map((cert, index) => (
                <div key={index} className="mb-4">
                  <Image
                    src={`${Gateway_url}/ipfs/${cert}`}
                    alt={`Certification ${index + 1}`}
                    width={300}
                    height={200}
                    objectFit="contain"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-600">No certificates available.</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManagerData;
