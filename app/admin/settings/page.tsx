import { prisma } from '@/lib/prisma';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

export default async function AdminSettings() {
  let settings = await prisma.settings.findFirst();
  
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        contactEmail: '',
        phoneNumber: '',
        socialLinks: {},
        footerLinks: {}
      }
    });
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Website Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <SettingsForm initialData={settings} />
        </div>
      </div>
    </div>
  );
}
