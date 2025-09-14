import React from 'react';
import { useNavigate } from 'react-router-dom'; 

// A mapping for badge colors based on status and risk
const statusColors = {
  "Active": "bg-green-100 text-green-800",
  "Renewal Due": "bg-yellow-100 text-yellow-800",
  "Expired": "bg-red-100 text-red-800",
};

const riskColors = {
  "Low": "bg-blue-100 text-blue-800",
  "Medium": "bg-yellow-100 text-yellow-800",
  "High": "bg-red-100 text-red-800",
};

const ContractsTable = ({ contracts }) => {
  const navigate = useNavigate(); //Initialize the hook

  const handleRowClick = (contractId) => {
    navigate(`/contract/${contractId}`);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parties</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {contracts.map((contract) => (
            //Add onClick handler and cursor style to the table row
            <tr 
              key={contract.id} 
              className="hover:bg-gray-100 cursor-pointer" 
              onClick={() => handleRowClick(contract.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contract.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.parties}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.expiry}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[contract.status]}`}>
                  {contract.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${riskColors[contract.risk]}`}>
                  {contract.risk}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractsTable;