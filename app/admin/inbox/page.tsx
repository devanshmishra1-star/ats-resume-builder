import { prisma } from '@/lib/prisma';
import { Mail, Check, Trash2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function InboxPage() {
  const messages = await prisma.inboxMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="divide-y divide-gray-100">
          {messages.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Mail className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>No messages yet. When users contact you, they will appear here.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`p-6 transition-colors ${msg.isRead ? 'bg-white' : 'bg-blue-50/50'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-lg ${msg.isRead ? 'font-medium' : 'font-bold'} text-gray-900`}>
                      {msg.subject || 'No Subject'}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                      <span className="font-medium text-gray-700">{msg.name}</span>
                      <span>&middot;</span>
                      <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">{msg.email}</a>
                      <span>&middot;</span>
                      <span>{msg.createdAt.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {/* Add client components for these actions later if needed */}
                    <button className="p-2 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50" title="Mark as Read">
                      <Check size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="mt-4 text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-sm border border-gray-100">
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
