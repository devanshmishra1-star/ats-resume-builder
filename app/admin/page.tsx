import { prisma } from '../../lib/prisma';
import { FileText, LayoutTemplate, Settings, ImageIcon, HardDrive } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [
    totalBlogs,
    publishedBlogs,
    totalTemplates,
    publishedTemplates,
    totalMedia,
    mediaAgg,
    recentBlogs
  ] = await Promise.all([
    prisma.blog.count({ where: { deletedAt: null } }),
    prisma.blog.count({ where: { status: 'PUBLISHED', deletedAt: null } }),
    prisma.template.count({ where: { deletedAt: null } }),
    prisma.template.count({ where: { status: 'PUBLISHED', deletedAt: null } }),
    prisma.media.count(),
    prisma.media.aggregate({ _sum: { size: true } }),
    prisma.blog.findMany({
      where: { deletedAt: null },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, status: true, updatedAt: true }
    })
  ]);

  const draftBlogs = totalBlogs - publishedBlogs;
  const draftTemplates = totalTemplates - publishedTemplates;
  const storageUsageBytes = mediaAgg._sum.size || 0;
  const storageUsageMB = (storageUsageBytes / (1024 * 1024)).toFixed(2);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Analytics</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Blogs</p>
            <p className="text-2xl font-bold text-gray-900">{totalBlogs}</p>
            <p className="text-xs text-green-600 mt-1">{publishedBlogs} Pub / {draftBlogs} Draft</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
            <LayoutTemplate size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Templates</p>
            <p className="text-2xl font-bold text-gray-900">{totalTemplates}</p>
            <p className="text-xs text-green-600 mt-1">{publishedTemplates} Pub / {draftTemplates} Draft</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
            <ImageIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Media Files</p>
            <p className="text-2xl font-bold text-gray-900">{totalMedia}</p>
            <p className="text-xs text-amber-600 mt-1">Uploaded assets</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
            <HardDrive size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Storage Usage</p>
            <p className="text-2xl font-bold text-gray-900">{storageUsageMB} MB</p>
            <p className="text-xs text-emerald-600 mt-1">Cloudinary footprint</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Recent Blogs</h2>
            <Link href="/admin/blogs" className="text-sm text-blue-600 hover:text-blue-800">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentBlogs.length === 0 ? (
              <p className="p-6 text-sm text-gray-500">No blogs found.</p>
            ) : (
              recentBlogs.map((blog) => (
                <div key={blog.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{blog.title}</p>
                    <p className="text-xs text-gray-500 mt-1">Updated on {blog.updatedAt.toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    blog.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {blog.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900">Quick Links</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Link href="/admin/inbox" className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center">
              <span className="block font-medium text-gray-900">Inbox</span>
              <span className="text-xs text-gray-500">Contact forms</span>
            </Link>
            <Link href="/admin/subscribers" className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center">
              <span className="block font-medium text-gray-900">Subscribers</span>
              <span className="text-xs text-gray-500">Newsletter list</span>
            </Link>
            <Link href="/admin/settings" className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center">
              <span className="block font-medium text-gray-900">Settings</span>
              <span className="text-xs text-gray-500">SEO & Analytics</span>
            </Link>
            <Link href="/admin/media" className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center">
              <span className="block font-medium text-gray-900">Media</span>
              <span className="text-xs text-gray-500">Manage assets</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
