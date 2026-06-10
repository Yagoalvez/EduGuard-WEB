import bcrypt from "bcrypt"
import prisma from "../database/prisma"
import { generateToken } from "../utils/jwt"
import { validarCampoObrigatorio, validarCpf } from "../utils/validations"

class AuthService {
  async login(login: string, senha: string) {
    validarCampoObrigatorio(login, "login (cpf ou email)")
    validarCampoObrigatorio(senha, "senha")

    // Tentar como Funcionario primeiro (email ou cpf)
    const funcCpf = login.replace(/\D/g, "")
    const funcionario = await prisma.funcionario.findFirst({
      where: {
        OR: [
          { email: { equals: login, mode: 'insensitive' } },
          { cpf: funcCpf.length === 11 ? funcCpf : undefined }
        ]
      },
      include: {
        funcaofuncionario: true
      }
    })

    if (funcionario) {
      if (!funcionario.ativo) {
        throw new Error("Acesso do funcionário desativado.")
      }
      const senhaCorreta = (await bcrypt.compare(senha, funcionario.senha as string).catch(() => false)) || (senha === funcionario.senha)
      if (senhaCorreta) {
        const token = generateToken({ id: funcionario.idfuncionario, tipo_usuario: 'funcionario', funcao: funcionario.funcaofuncionario?.descricaofuncao || "" })
        const { senha: _, ...funcSemSenha } = funcionario
        
        await prisma.logsistema.create({
          data: {
            acao: "LOGIN",
            entidade: "Funcionario",
            identidade: funcionario.idfuncionario,
            idfuncionario: funcionario.idfuncionario,
            detalhes: `${funcionario.nome} fez login no sistema.`
          }
        }).catch(() => {})

        return {
          token,
          user: {
            id: funcSemSenha.idfuncionario,
            nome: funcSemSenha.nome,
            email: funcSemSenha.email,
            cpf: funcSemSenha.cpf,
            tipo_usuario: "funcionario",
            funcao: funcSemSenha.funcaofuncionario?.descricaofuncao || ""
          }
        }
      }
    }

    // Tentar como Responsavel (cpf ou email)
    let responsavel = null
    try {
      const isEmail = login.includes('@');
      if (isEmail) {
        responsavel = await prisma.responsavel.findFirst({
          where: { email: { equals: login, mode: 'insensitive' } }
        });
      } else {
        const cpfLimpo = validarCpf(login)
        responsavel = await prisma.responsavel.findFirst({
          where: { cpf: cpfLimpo }
        })
      }
    } catch(e) {}

    if (responsavel) {
      if (!responsavel.ativo) {
        throw new Error("Acesso do responsável desativado.")
      }
      const senhaCorreta = (await bcrypt.compare(senha, responsavel.senha as string).catch(() => false)) || (senha === responsavel.senha)
      if (senhaCorreta) {
        const token = generateToken({ id: responsavel.idresponsavel, tipo_usuario: 'responsavel', funcao: 'responsavel' })
        const { senha: _, ...respSemSenha } = responsavel

        await prisma.logsistema.create({
          data: {
            acao: "LOGIN",
            entidade: "Responsavel",
            identidade: responsavel.idresponsavel,
            detalhes: `${responsavel.nome} fez login no sistema.`
          }
        }).catch(() => {})

        return {
          token,
          user: {
            id: respSemSenha.idresponsavel,
            nome: respSemSenha.nome,
            email: respSemSenha.email,
            cpf: respSemSenha.cpf,
            tipo_usuario: "responsavel",
            funcao: "responsavel"
          }
        }
      }
    }

    throw new Error("Credenciais inválidas ou usuário inativo")
  }
}

export default new AuthService()