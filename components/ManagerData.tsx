"use client";

import React, { useState } from 'react';
import Modal from '../components/Modal';

interface Employee {
  id: string;
  name: string;
  role: string;
  lastUpdated: string;
  active: boolean;
  Certification: string[];
}

interface ManagerDataProps {
  data: {
    employeeAddeds: Employee[];
  };
}

const ManagerData: React.FC<ManagerDataProps> = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [certificateList, setCertificateList] = useState<string[]>([]);

  const handleModalOpen = (certificates: string[]) => {
    setCertificateList(certificates);
    setIsModalVisible(true);
  };

  const handleModalClose = () => setIsModalVisible(false);

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-40">
      {data.employeeAddeds.map((employee) => (
        <div key={employee.id} className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">{employee.name}</h3>
          <p className="text-gray-600">
            <span className="font-medium">Role: </span>{employee.role}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Last Updated: </span>{employee.lastUpdated}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Active: </span>{employee.active ? 'Yes' : 'No'}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => handleModalOpen(employee.Certification)}
          >
            View Certificates
          </button>
        </div>
      ))}

      {isModalVisible && (
        <Modal isOpen={isModalVisible} onClose={handleModalClose} title="Employee Certificates">
          <div className="p-4">
            <ul className="list-disc list-inside">
              {certificateList.length > 0 ? (
                certificateList.map((cert, index) => (
                  <li key={index} className="text-gray-800">
                    {cert}
                  </li>
                ))
              ) : (
                <p className="text-gray-600">No certificates available.</p>
              )}
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManagerData;
