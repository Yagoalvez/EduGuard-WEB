const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const f = await prisma.funcionario.create({
      data: {
        nome: 'Teste',
        email: 'teste222@eduguard.com',
        cpf: '09876543210',
        matriculafuncionario: 'FUN-2026-0099',
        senha: '123',
        idfuncao: 1,
        ativo: true
      }
    });
    console.log(f);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
main();
