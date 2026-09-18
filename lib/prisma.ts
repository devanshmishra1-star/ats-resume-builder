import './polyfill';
import { PrismaClient } from './generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Initialize pg pool
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 1 // limit connections in serverless environment
});
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
