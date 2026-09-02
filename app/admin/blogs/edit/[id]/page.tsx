import BlogForm from '../../BlogForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const blog = await prisma.blog.findUnique({
    where: { id }
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center space-x-4">
        <Link href="/admin/blogs" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Blog: {blog.title}</h1>
      </div>
      <BlogForm initialData={blog} />
    </div>
  );
}
