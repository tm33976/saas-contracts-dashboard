import React from 'react';
import { Link } from 'react-router-dom';
import { FiTool } from 'react-icons/fi'; 
import MainLayout from '../components/layout/MainLayout';

export default function ComingSoonPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-full text-center bg-white p-8 rounded-lg shadow-md">
        <FiTool className="w-20 h-20 mb-6 text-indigo-400" />
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Feature Coming Soon!
        </h1>
        
        <p className="text-lg text-gray-500 mb-8 max-w-md">
          This section is currently under progress. We're working to bring you this feature. Please check back later!
        </p>
        
        <Link 
          to="/" 
          className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </MainLayout>
  );
}