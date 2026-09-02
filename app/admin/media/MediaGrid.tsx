'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Copy, Trash2, ExternalLink } from 'lucide-react';

export default function MediaGrid({ initialMedia }: { initialMedia: any[] }) {
  const [media, setMedia] = useState(initialMedia);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.filename.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' 
      ? true 
      : filter === 'image' 
        ? item.format.includes('image') || item.format === 'unknown'
        : item.format.includes(filter);
    return matchesSearch && matchesFilter;
  });

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;
    
    // In a real app, call a DELETE API route here.
    // await fetch(`/api/admin/upload?id=${id}`, { method: 'DELETE' });
    setMedia(media.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Types</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.map((item) => (
          <div key={item.id} className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-square flex items-center justify-center">
            <Image 
              src={item.url.includes('upload') ? item.url.replace('/upload/', '/upload/f_auto,q_auto,w_400/') : item.url} 
              alt={item.filename} 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 p-2">
              <div className="flex space-x-2 mb-2">
                <button onClick={() => handleCopy(item.url)} className="p-1.5 bg-white text-gray-800 rounded hover:bg-gray-200" title="Copy URL">
                  <Copy size={16} />
                </button>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white text-gray-800 rounded hover:bg-gray-200" title="Open in new tab">
                  <ExternalLink size={16} />
                </a>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
              <span className="text-white text-xs truncate w-full px-2 text-center" title={item.filename}>{item.filename}</span>
              <span className="text-gray-300 text-xs mt-1">{(item.size / 1024).toFixed(1)} KB</span>
            </div>
          </div>
        ))}

        {filteredMedia.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white border border-dashed rounded-lg">
            No media found.
          </div>
        )}
      </div>
    </div>
  );
}
