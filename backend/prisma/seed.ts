import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  await prisma.respostacomunicado.deleteMany()
  await prisma.avisoresponsavel.deleteMany()
  await prisma.aviso.deleteMany()
  await prisma.administracaomedicacao.deleteMany()
  await prisma.medicacao.deleteMany()
  await prisma.rotinachecklist.deleteMany()
  await prisma.entradasaida.deleteMany()
  await prisma.enturmacao.deleteMany()
  await prisma.responsavelaluno.deleteMany()
  await prisma.turma.deleteMany()
  await prisma.aluno.deleteMany()
  await prisma.logsistema.deleteMany()
  await prisma.responsavel.deleteMany()
  await prisma.funcionario.deleteMany()
  await prisma.funcaofuncionario.deleteMany()
  await prisma.instituicao.deleteMany()

  const senhaHash = await bcrypt.hash("12345678", 10)

  // Instituição
  const instituicao = await prisma.instituicao.create({
    data: {
      descricao: "EduGuard School",
      ativo: true,
      dataini: new Date()
    }
  })

  // Funções
  const diretorFuncao = await prisma.funcaofuncionario.create({
    data: { descricaofuncao: "diretor" }
  })
  const porteiroFuncao = await prisma.funcaofuncionario.create({
    data: { descricaofuncao: "porteiro" }
  })
  const professorFuncao = await prisma.funcaofuncionario.create({
    data: { descricaofuncao: "professor" }
  })

  // Diretor
  const diretor = await prisma.funcionario.create({
    data: {
      nome: "Romulo Diretor",
      email: "Romulo@diretor.com",
      cpf: "11111111111",
      senha: senhaHash,
      ativo: true,
      idfuncao: diretorFuncao.idfuncao,
      idinstituicao: instituicao.idinstituicao,
      matriculafuncionario: "DIR001"
    }
  })

  // Porteiro
  const porteiro = await prisma.funcionario.create({
    data: {
      nome: "João Porteiro",
      email: "joao@escola.com",
      cpf: "22222222222",
      senha: senhaHash,
      ativo: true,
      idfuncao: porteiroFuncao.idfuncao,
      idinstituicao: instituicao.idinstituicao,
      matriculafuncionario: "POR001"
    }
  })

  // Professor
  const professor = await prisma.funcionario.create({
    data: {
      nome: "Maria Professora",
      email: "maria@escola.com",
      cpf: "33333333333",
      senha: senhaHash,
      ativo: true,
      idfuncao: professorFuncao.idfuncao,
      idinstituicao: instituicao.idinstituicao,
      matriculafuncionario: "PROF001"
    }
  })

  // Responsável
  const responsavel = await prisma.responsavel.create({
    data: {
      nome: "Mariano Rocha",
      email: "marianorocha@gmail.com",
      cpf: "00000000000",
      senha: senhaHash,
      ativo: true,
      master: true,
      celular: "11999999999"
    }
  })

  // Aluno
  const aluno = await prisma.aluno.create({
    data: {
      nome: "Lucas Rocha",
      matricula: "AL001",
      datanascimento: new Date("2015-05-10"),
      ativo: true
    }
  })

  // Vínculo Responsável -> Aluno
  await prisma.responsavelaluno.create({
    data: {
      idaluno: aluno.idaluno,
      idresponsavel: responsavel.idresponsavel
    }
  })

  // Turma
  const turma = await prisma.turma.create({
    data: {
      codigoturma: "T1A",
      capacidademaxima: 30,
      dataini: new Date(),
      idinstituicao: instituicao.idinstituicao,
      idfuncionario: professor.idfuncionario
    }
  })

  // Enturmação
  await prisma.enturmacao.create({
    data: {
      idaluno: aluno.idaluno,
      idturma: turma.idturma,
      dtmatricula: new Date()
    }
  })

  console.log("Seed concluído com sucesso!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
