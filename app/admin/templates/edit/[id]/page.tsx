import TemplateForm from '../../TemplateForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const template = await prisma.template.findUnique({
    where: { id }
  });

  if (!template) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center space-x-4">
        <Link href="/admin/templates" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Template: {template.name}</h1>
      </div>
      <TemplateForm initialData={template} />
    </div>
  );
}
