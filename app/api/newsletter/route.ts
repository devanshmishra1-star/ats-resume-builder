import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { newsletterSchema } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const validatedData = newsletterSchema.parse(body);

    const subscriber = await prisma.subscriber.upsert({
      where: { email: validatedData.email },
      update: { isSubscribed: true },
      create: {
        email: validatedData.email,
        isSubscribed: true,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Newsletter Error:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
