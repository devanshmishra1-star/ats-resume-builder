import { prisma } from '../lib/prisma';
import { site, blogPosts, templateNames } from '../lib/site-data';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding database...');

  // 0. Seed Admin
  console.log('Creating default admin...');
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const adminExists = await prisma.admin.findUnique({ where: { email: adminEmail } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await prisma.admin.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
        }
      });
      console.log(`Default admin created! Email: ${adminEmail}`);
    } else {
      console.log('Admin already exists.');
    }
  } else {
    console.log('Skipping admin creation (ADMIN_EMAIL or ADMIN_PASSWORD not set).');
  }

  // 1. Seed Settings
  console.log('Seeding settings...');
  const existingSettings = await prisma.settings.findFirst();
  if (!existingSettings) {
    await prisma.settings.create({
      data: {
        contactEmail: site.email,
        phoneNumber: site.phone,
        googleAnalytics: '',
        searchConsole: '',
        adsenseCode: '',
        socialLinks: {},
        footerLinks: {}
      }
    });
  }

  // 2. Seed Blogs
  console.log('Seeding blogs...');
  for (const blog of blogPosts) {
    const exists = await prisma.blog.findUnique({ where: { slug: blog.slug } });
    if (!exists) {
      await prisma.blog.create({
        data: {
          title: blog.title,
          slug: blog.slug,
          category: blog.category,
          featuredImage: `/assets/${blog.image}`,
          content: blog.advice.map((adv) => `<p>${adv}</p>`).join(''),
          metaDescription: blog.description,
          readTime: blog.readTime,
          status: 'PUBLISHED',
          publishedAt: new Date(),
        }
      });
    }
  }

  // 3. Seed Templates
  console.log('Seeding templates...');
  let order = 0;
  for (const tName of templateNames) {
    const slug = tName.toLowerCase().replace(/\s+/g, '-');
    const exists = await prisma.template.findUnique({ where: { slug } });
    if (!exists) {
      await prisma.template.create({
        data: {
          name: tName,
          slug,
          category: 'Professional',
          displayOrder: order++,
          status: 'PUBLISHED',
        }
      });
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
