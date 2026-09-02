import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    const adminId = token ? await verifyToken(token) : null;
    
    if (!adminId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'ats_resume_builder' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const result = uploadResult as any;

    // Apply auto optimization transformation
    const optimizedUrl = result.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');

    // Save media to DB
    const media = await prisma.media.create({
      data: {
        url: optimizedUrl,
        publicId: result.public_id,
        filename: result.original_filename || file.name,
        format: result.format || 'unknown',
        size: result.bytes || 0,
        width: result.width || 0,
        height: result.height || 0,
        altText: '',
      }
    });

    return NextResponse.json({ url: media.url, id: media.id });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
