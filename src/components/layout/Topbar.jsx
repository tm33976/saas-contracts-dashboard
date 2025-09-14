import React from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ onUploadClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

   return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div /> 
      <div className="flex items-center space-x-4">
        <button
          onClick={onUploadClick} 
          className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:cursor-pointer"
        >
          Upload Contract
        </button>
        <div className="relative">
          <button className="flex items-center space-x-2">
            <FiUser className="w-6 h-6 rounded-full" />
            <span className="text-gray-600">Tushar</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;