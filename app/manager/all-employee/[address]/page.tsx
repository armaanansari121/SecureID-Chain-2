// manager/all-employee/[address]/page.tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EmployeePage = () => {
  const router = useRouter();
  const { address } = router.query; // Extract the address from the URL

  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    if (address) {
      // Fetch employee data from a blockchain or API using the address
      fetchEmployeeData(address as string);
    }
  }, [address]);

  const fetchEmployeeData = async (address: string) => {
    try {
      // Example: Fetching from an API
      const response = await fetch(`/api/employee/${address}`);
      const data = await response.json();
      setEmployeeData(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Employee Details for Address: {address}</h1>
      <div>
        {/* <p>Name: {employeeData.name}</p>
        <p>Role: {employeeData.role}</p>
        <p>Active: {employeeData.active ? 'Yes' : 'No'}</p>
        <p>Last Updated: {new Date(employeeData.lastUpdated * 1000).toLocaleString()}</p> */}
        {/* Render more employee details as needed */}
      </div>
    </div>
  );
};

export default EmployeePage;
