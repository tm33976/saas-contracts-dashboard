import React, { useState, useEffect, useMemo } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ContractsTable from '../components/ContractsTable';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import Pagination from '../components/Pagination';
import UploadModal from '../components/UploadModal';
const ROWS_PER_PAGE = 10;

export default function DashboardPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters, search, and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
  const fetchContracts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/contracts.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setContracts(data); 
    } catch (err) {
      setError('Failed to fetch contracts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  setTimeout(fetchContracts, 1000);
}, []);

  // Memoized filtered contracts
  const filteredContracts = useMemo(() => {
    setCurrentPage(1); // It will reset to first page on any filter change
    return contracts
      .filter(c => statusFilter === 'All' || c.status === statusFilter)
      .filter(c => riskFilter === 'All' || c.risk === riskFilter)
      .filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.parties.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [contracts, searchTerm, statusFilter, riskFilter]);

  // Memoized paginated contracts
  const paginatedContracts = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredContracts.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [filteredContracts, currentPage]);

  const renderContent = () => {
    if (loading) return <div className="text-center text-gray-500">Loading contracts...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (filteredContracts.length === 0) {
      return <div className="text-center text-gray-500">No contracts match your criteria.</div>;
    }
    return (
      <>
        <ContractsTable contracts={paginatedContracts} />
        <Pagination
          currentPage={currentPage}
          totalItems={filteredContracts.length}
          itemsPerPage={ROWS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </>
    );
  };

 return (
    // 1. Passing the onUploadClick prop here
    <MainLayout onUploadClick={() => setIsModalOpen(true)}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Contracts Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-white rounded-lg shadow">
        <div className="md:col-span-1">
          <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <FilterDropdown
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: 'All', label: 'All Statuses' },
            { value: 'Active', label: 'Active' },
            { value: 'Renewal Due', label: 'Renewal Due' },
            { value: 'Expired', label: 'Expired' },
          ]}
        />
        <FilterDropdown
          label="Risk"
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          options={[
            { value: 'All', label: 'All Risks' },
            { value: 'Low', label: 'Low' },
            { value: 'Medium', label: 'Medium' },
            { value: 'High', label: 'High' },
          ]}
        />
      </div>

      {renderContent()}

      {/* 2. Rendering the UploadModal component here */}
      <UploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </MainLayout>
  );
}