import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { FiFileText, FiAlertTriangle, FiCheckCircle, FiChevronLeft } from 'react-icons/fi';

// Mappings for styling
const riskColors = {
  "Low": { bg: "bg-blue-100", text: "text-blue-800", icon: FiCheckCircle },
  "Medium": { bg: "bg-yellow-100", text: "text-yellow-800", icon: FiAlertTriangle },
  "High": { bg: "bg-red-100", text: "text-red-800", icon: FiAlertTriangle },
};

export default function ContractDetailPage() {
  const { contractId } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContractDetail = async () => {
      try {
        setLoading(true);
        // For this mock setup, I fetch the same detail file regardless of ID.
        const response = await fetch('/contract-detail.json');
        if (!response.ok) throw new Error('Failed to fetch contract details');
        const data = await response.json();
        setContract(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContractDetail();
  }, [contractId]);

  if (loading) return <MainLayout><div className="text-center">Loading details...</div></MainLayout>;
  if (error) return <MainLayout><div className="text-center text-red-500">{error}</div></MainLayout>;
  if (!contract) return null;

  const RiskIcon = riskColors[contract.risk]?.icon || FiAlertTriangle;

  return (
    <MainLayout>
      {/* Back Link and Header */}
      <Link to="/" className="flex items-center text-sm text-indigo-600 hover:text-amber-950 mb-4 ">
        <FiChevronLeft className="mr-1" /> Back to Contracts
      </Link>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{contract.name}</h1>
        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${riskColors[contract.risk]?.bg} ${riskColors[contract.risk]?.text}`}>
          <RiskIcon className="mr-2" />
          {contract.risk} Risk
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Clauses Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Key Clauses</h2>
            <div className="space-y-4">
              {contract.clauses.map(clause => (
                <div key={clause.id} className="border border-gray-200 p-4 rounded-md">
                  <h3 className="font-semibold text-gray-700">{clause.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{clause.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">AI Insights</h2>
            <ul className="space-y-3">
              {contract.insights.map(insight => {
                const InsightIcon = riskColors[insight.risk]?.icon || FiAlertTriangle;
                return (
                  <li key={insight.id} className={`flex items-start p-3 rounded-md ${riskColors[insight.risk]?.bg}`}>
                    <InsightIcon className={`flex-shrink-0 mr-3 mt-1 h-5 w-5 ${riskColors[insight.risk]?.text}`} />
                    <p className={`text-sm ${riskColors[insight.risk]?.text}`}>{insight.message}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Evidence & Metadata Side Panel as per the assignment requirement */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Metadata</h2>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="font-medium text-gray-600">Parties:</span> <span className="text-gray-800">{contract.parties}</span></div>
                    <div className="flex justify-between"><span className="font-medium text-gray-600">Start Date:</span> <span className="text-gray-800">{contract.start}</span></div>
                    <div className="flex justify-between"><span className="font-medium text-gray-600">Expiry Date:</span> <span className="text-gray-800">{contract.expiry}</span></div>
                    <div className="flex justify-between"><span className="font-medium text-gray-600">Status:</span> <span className="text-gray-800">{contract.status}</span></div>
                </div>
            </div>
             <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Evidence</h2>
                <div className="space-y-4">
                  {contract.evidence.map(ev => (
                    <div key={ev.id} className="border-l-4 border-indigo-500 pl-4 py-2">
                        <p className="text-sm text-gray-700 italic">"{ev.snippet}"</p>
                        <p className="text-xs text-gray-500 text-right mt-1">Source: {ev.source}</p>
                    </div>
                  ))}
                </div>
            </div>
        </div>
      </div>
    </MainLayout>
  );
}