import TemplateForm from '../TemplateForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewTemplatePage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center space-x-4">
        <Link href="/admin/templates" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create New Template</h1>
      </div>
      <TemplateForm />
    </div>
  );
}
