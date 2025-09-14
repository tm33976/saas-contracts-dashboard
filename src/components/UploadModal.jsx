import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal from './Modal';
import { FiUploadCloud, FiFile, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

const UploadModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      id: Math.random(),
      status: 'uploading', // Initial status
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload process
    newFiles.forEach(file => {
      setTimeout(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === file.id) {
            // Randomly succeed or fail
            return { ...f, status: Math.random() > 0.3 ? 'success' : 'error' };
          }
          return f;
        }));
      }, 2000 + Math.random() * 2000); // Simulate 2-4 second upload time
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'application/pdf, .doc, .docx' });
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading': return <FiLoader className="animate-spin text-blue-500" />;
      case 'success': return <FiCheckCircle className="text-green-500" />;
      case 'error': return <FiAlertCircle className="text-red-500" />;
      default: return <FiFile className="text-gray-500" />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Contracts">
      <div {...getRootProps()} className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}>
        <input {...getInputProps()} />
        <FiUploadCloud className="w-12 h-12 mx-auto text-gray-400" />
        {isDragActive ?
          <p className="mt-2 text-indigo-600">Drop the files here...</p> :
          <p className="mt-2 text-gray-600">Drag & drop files here, or click to select files</p>
        }
        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX</p>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold text-gray-700">Uploading Files</h4>
          {files.map(file => (
            <div key={file.id} className="flex items-center p-2 border rounded-md">
              <FiFile className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
              <div className="flex-grow text-sm text-gray-800">{file.name}</div>
              <div className="w-5 h-5 ml-3 flex-shrink-0">
                {getStatusIcon(file.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default UploadModal;