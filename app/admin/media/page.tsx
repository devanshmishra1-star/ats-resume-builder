import { prisma } from '@/lib/prisma';
import MediaGrid from './MediaGrid';

export const dynamic = 'force-dynamic';

export default async function MediaLibraryPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
      </div>

      <MediaGrid initialMedia={media} />
    </div>
  );
}
