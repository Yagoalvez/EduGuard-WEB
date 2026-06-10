const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.checklist.findMany().then(console.log).finally(() => prisma.$disconnect());
