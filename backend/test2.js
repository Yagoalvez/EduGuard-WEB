const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.funcaofuncionario.findMany().then(console.log).finally(() => prisma.$disconnect());
