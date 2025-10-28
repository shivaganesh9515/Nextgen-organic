'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle, X } from 'lucide-react';
import GlassyButton from '../ui/GlassyButton';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onFileRemove: () => void;
  uploadedFile: File | null;
  uploadProgress: number;
  isUploading: boolean;
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
  errorMessage?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  onFileRemove,
  uploadedFile,
  uploadProgress,
  isUploading,
  uploadStatus,
  errorMessage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
        isUploading ? 'border-blue-400 bg-blue-50' : 
        uploadStatus === 'success' ? 'border-green-400 bg-green-50' : 
        uploadStatus === 'error' ? 'border-red-400 bg-red-50' : 
        'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => !isUploading && fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".csv,.xlsx,.xls"
        disabled={isUploading}
        aria-label="Upload file"
      />
      
      {isUploading ? (
        <div className="space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mx-auto h-12 w-12 text-blue-500"
          >
            <Upload className="h-12 w-12" />
          </motion.div>
          <div>
            <p className="font-medium text-gray-900">Uploading...</p>
            <p className="text-sm text-gray-500 mt-1">
              {uploadedFile?.name}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-blue-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
          <p className="text-sm text-gray-500">{uploadProgress}%</p>
        </div>
      ) : uploadStatus === 'success' ? (
        <div className="space-y-4">
          <div className="mx-auto h-12 w-12 text-green-500">
            <CheckCircle className="h-12 w-12" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Upload Successful!</p>
            <p className="text-sm text-gray-500 mt-1">
              {uploadedFile?.name}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFileRemove();
            }}
            className="text-sm text-primary-600 hover:text-primary-700"
            aria-label="Upload another file"
          >
            Upload another file
          </button>
        </div>
      ) : uploadStatus === 'error' ? (
        <div className="space-y-4">
          <div className="mx-auto h-12 w-12 text-red-500">
            <AlertCircle className="h-12 w-12" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Upload Failed</p>
            <p className="text-sm text-gray-500 mt-1">
              {errorMessage || 'Something went wrong'}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFileRemove();
            }}
            className="text-sm text-primary-600 hover:text-primary-700"
            aria-label="Try again"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <FileSpreadsheet className="h-12 w-12" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Drag & drop your file here</p>
            <p className="text-sm text-gray-500 mt-1">
              or <span className="text-primary-600 font-medium">browse files</span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supports: CSV, XLSX, XLS (Max 10MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const BulkImportExport: React.FC = () => {
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [importError, setImportError] = useState<string | undefined>(undefined);
  
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  const handleImportFile = (file: File) => {
    // Validate file type
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validTypes.includes(file.type)) {
      setImportStatus('error');
      setImportError('Invalid file type. Please upload a CSV or Excel file.');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setImportStatus('error');
      setImportError('File size exceeds 10MB limit.');
      return;
    }

    setImportFile(file);
    setImportStatus('uploading');
    setImportError(undefined);
    setIsImporting(true);
    setImportProgress(0);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setImportProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          setImportStatus('success');
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleRemoveImportFile = () => {
    setImportFile(null);
    setImportStatus('idle');
    setImportProgress(0);
    setImportError(undefined);
  };

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      alert(`Exported data as ${exportFormat.toUpperCase()} successfully!`);
    }, 1500);
  };

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">Bulk Import/Export</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Import Section */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4 flex items-center">
            <Upload className="h-5 w-5 mr-2 text-blue-500" />
            Import Products
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Upload a CSV or Excel file to add or update multiple products at once.
          </p>
          
          <FileUpload
            onFileUpload={handleImportFile}
            onFileRemove={handleRemoveImportFile}
            uploadedFile={importFile}
            uploadProgress={importProgress}
            isUploading={isImporting}
            uploadStatus={importStatus}
            errorMessage={importError}
          />
          
          {importStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-blue-50 rounded-lg"
            >
              <h4 className="font-medium text-blue-800">Import Summary</h4>
              <ul className="mt-2 text-sm text-blue-700 space-y-1">
                <li>• 125 products processed</li>
                <li>• 118 products added</li>
                <li>• 7 products updated</li>
                <li>• 0 errors</li>
              </ul>
            </motion.div>
          )}
        </div>
        
        {/* Export Section */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4 flex items-center">
            <Download className="h-5 w-5 mr-2 text-green-500" />
            Export Products
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Download your product catalog in various formats.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Export Format
              </label>
              <div className="flex space-x-4">
                {[
                  { id: 'csv', label: 'CSV' },
                  { id: 'xlsx', label: 'Excel (XLSX)' },
                  { id: 'json', label: 'JSON' },
                ].map((format) => (
                  <label key={format.id} className="flex items-center">
                    <input
                      type="radio"
                      name="exportFormat"
                      value={format.id}
                      checked={exportFormat === format.id}
                      onChange={() => setExportFormat(format.id)}
                      className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      aria-label={`Export as ${format.label}`}
                    />
                    <span className="ml-2 text-sm text-gray-700">{format.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="pt-4">
              <GlassyButton
                onClick={handleExport}
                disabled={isExporting}
                className="w-full flex items-center justify-center"
              >
                {isExporting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 mr-2"
                    >
                      <Download className="h-4 w-4" />
                    </motion.div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export Products
                  </>
                )}
              </GlassyButton>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Template</h4>
            <p className="text-sm text-gray-600 mb-3">
              Download our template to ensure your data is formatted correctly.
            </p>
            <button 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              aria-label="Download CSV Template"
            >
              Download CSV Template
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};