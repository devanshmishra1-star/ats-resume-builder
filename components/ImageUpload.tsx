"use client";

import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {value ? (
        <div className="relative w-full h-48 border rounded-lg overflow-hidden group">
          <Image 
            src={value.startsWith('http') ? value : `/assets/${value}`} 
            alt="Uploaded image" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 hidden group-hover:flex items-center justify-center transition-all">
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 border-gray-300">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
            {isUploading ? (
              <Loader2 className="w-8 h-8 mb-4 animate-spin text-gray-400" />
            ) : (
              <Upload className="w-8 h-8 mb-4 text-gray-400" />
            )}
            <p className="text-sm">
              <span className="font-semibold">{isUploading ? 'Uploading...' : 'Click to upload'}</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
