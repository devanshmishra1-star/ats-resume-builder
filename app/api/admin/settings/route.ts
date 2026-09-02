import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    const existingSettings = await prisma.settings.findFirst();

    if (existingSettings) {
      await prisma.settings.update({
        where: { id: existingSettings.id },
        data: {
          contactEmail: data.contactEmail,
          phoneNumber: data.phoneNumber,
          androidAppLink: data.androidAppLink,
          googleAnalytics: data.googleAnalytics,
          searchConsole: data.searchConsole,
          adsenseCode: data.adsenseCode,
        }
      });
    } else {
      await prisma.settings.create({
        data: {
          contactEmail: data.contactEmail,
          phoneNumber: data.phoneNumber,
          androidAppLink: data.androidAppLink,
          googleAnalytics: data.googleAnalytics,
          searchConsole: data.searchConsole,
          adsenseCode: data.adsenseCode,
          socialLinks: {},
          footerLinks: {},
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
