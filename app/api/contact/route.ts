import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema, sanitizeHtml } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const validatedData = contactSchema.parse(body);

    const message = await prisma.inboxMessage.create({
      data: {
        name: sanitizeHtml(validatedData.name),
        email: validatedData.email,
        subject: validatedData.subject ? sanitizeHtml(validatedData.subject) : '',
        message: sanitizeHtml(validatedData.message),
      }
    });

    return NextResponse.json({ success: true, id: message.id });
  } catch (error: any) {
    console.error('Contact Submission Error:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
