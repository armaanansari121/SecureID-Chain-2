'use client';

import { useState, useEffect } from 'react';

// Helper function to convert UNIX timestamp to a readable date
function convertTimestampToDate(timestamp: string | number) {
  const parsedTimestamp = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;

  if (isNaN(parsedTimestamp) || parsedTimestamp <= 0) {
    return 'Invalid Date';
  }

  const date = new Date(parsedTimestamp * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Data component that receives props from the parent
export default function Data({ data }: { data: any }) {
  const [updatedEmployees, setUpdatedEmployees] = useState([]);

  useEffect(() => {
    if (data && data.employeeAddeds) {
      const transformedData = data.employeeAddeds.map((employee: any) => ({
        ...employee,
        lastUpdated: convertTimestampToDate(employee.lastUpdated),
      }));

      setUpdatedEmployees(transformedData);
    }
  }, [data]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Employee Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {updatedEmployees.map((employee: any) => (
          <div
            key={employee.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{employee.name}</h3>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Role:</span> {employee.role}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Last Updated:</span>{' '}
              {employee.lastUpdated}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Active:</span> {employee.active ? 'Yes' : 'No'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
