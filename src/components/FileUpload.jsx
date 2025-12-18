import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadService from '../services/uploadService';
import { toast } from 'react-hot-toast';

const FileUpload = ({ 
  onUploadComplete, 
  multiple = false, 
  maxFiles = 5,
  accept = 'image/*,.pdf',
  label = 'Drag & drop files here, or click to select',
  showPreview = true
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      let result;
      
      if (multiple) {
        // Upload multiple files
        result = await uploadService.uploadMultipleFiles(acceptedFiles);
        setUploadedFiles(result.data || []);
      } else {
        // Upload single file
        const file = acceptedFiles[0];
        result = await uploadService.uploadFile(file);
        setUploadedFiles([result.data]);
      }
      
      toast.success(`Successfully uploaded ${acceptedFiles.length} file(s)`);
      
      if (onUploadComplete) {
        onUploadComplete(result.data);
      }
      
      // Simulate progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
      
      setTimeout(() => {
        clearInterval(interval);
        setUploading(false);
        setUploadProgress(0);
      }, 1500);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Upload failed');
      setUploading(false);
    }
  }, [multiple, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'application/pdf': ['.pdf']
    },
    maxFiles: multiple ? maxFiles : 1,
    disabled: uploading
  });

  const handleRemoveFile = async (publicId, index) => {
    try {
      await uploadService.deleteFile(publicId);
      const newFiles = [...uploadedFiles];
      newFiles.splice(index, 1);
      setUploadedFiles(newFiles);
      toast.success('File removed');
    } catch (error) {
      toast.error('Failed to remove file');
    }
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-secondary-300 hover:border-primary-400 hover:bg-secondary-50'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="text-secondary-700">Uploading... {uploadProgress}%</p>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <>
            <i className={`fas ${isDragActive ? 'fa-cloud-upload-alt' : 'fa-cloud-upload'} text-4xl text-primary-500 mb-4`}></i>
            <p className="text-secondary-700 font-medium mb-2">{label}</p>
            <p className="text-sm text-secondary-500">
              {multiple ? `Upload up to ${maxFiles} files` : 'Upload a single file'} • Max 10MB each
            </p>
            <p className="text-xs text-secondary-400 mt-2">
              Supports: JPG, PNG, GIF, WEBP, PDF
            </p>
            <button
              type="button"
              className="mt-4 bg-primary-500 text-white hover:bg-primary-600 px-4 py-2 rounded-lg transition-colors"
            >
              Select Files
            </button>
          </>
        )}
      </div>

      {/* Preview Uploaded Files */}
      {showPreview && uploadedFiles.length > 0 && (
        <div>
          <h4 className="font-medium text-secondary-700 mb-2">
            Uploaded Files ({uploadedFiles.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative border border-secondary-200 rounded-lg overflow-hidden group">
                {file.format === 'pdf' ? (
                  <div className="h-24 bg-red-50 flex items-center justify-center">
                    <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                  </div>
                ) : (
                  <img
                    src={uploadService.getThumbnailUrl(file.url)}
                    alt={file.originalname || 'Uploaded image'}
                    className="w-full h-24 object-cover"
                    loading="lazy"
                  />
                )}
                
                <div className="p-2">
                  <p className="text-xs font-medium text-secondary-900 truncate">
                    {file.originalname || `file_${index + 1}.${file.format}`}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {(file.bytes / 1024).toFixed(1)} KB
                  </p>
                </div>
                
                <button
                  onClick={() => handleRemoveFile(file.public_id, index)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  title="Remove file"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;