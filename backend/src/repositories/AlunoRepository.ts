import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class AlunoRepository {
  async findByResponsavelId(idresponsavel: number) {
    return await prisma.aluno.findMany({
      where: {
        responsavelaluno: {
          some: {
            idresponsavel: idresponsavel
          }
        }
      },
      include: {
        enturmacao: {
          include: {
            turma: true
          }
        }
      }
    })
  }
}

export default new AlunoRepository()
