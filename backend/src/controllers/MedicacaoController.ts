import { Request, Response, NextFunction } from "express"
import MedicacaoService from "../services/MedicacaoService"
import prisma from "../database/prisma"

class MedicacaoController {
  async getMinhasMedicacoes(req: Request, res: Response, next: NextFunction) {
    try {
      const idResponsavel = req.idResponsavel

      if (!idResponsavel) {
        return res.status(401).json({ message: "Usuário não autenticado" })
      }

      const medicacoes = await MedicacaoService.getMedicacoesByResponsavel(idResponsavel)
      
      return res.status(200).json(medicacoes)
    } catch (error) {
      next(error) // Route error to global error middleware
    }
  }

  async getByAluno(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const medicacoes = await prisma.medicacao.findMany({
        where: { idaluno: parseInt(id) }
      });
      const formatadas = medicacoes.map(m => ({
        id: m.idmedicacao,
        id_aluno: m.idaluno,
        nome_medicamento: m.nome,
        dosagem: m.dosagem,
        frequencia: m.descfrequencia,
        data_inicio: m.dataini,
        data_fim: m.datafim,
        receita_url: m.receita ? `/uploads/${Buffer.from(m.receita).toString('utf-8')}` : null
      }));
      return res.json(formatadas);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar medicações do aluno" });
    }
  }

  async agendar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_aluno, nome_medicamento, dosagem, frequencia, data_inicio, data_fim, observacao } = req.body;
      const receitaBuffer = req.file ? Buffer.from(req.file.filename, 'utf-8') : null;

      const medicacao = await prisma.medicacao.create({
        data: {
          idaluno: parseInt(id_aluno),
          nome: nome_medicamento,
          dosagem,
          descfrequencia: frequencia,
          dataini: new Date(data_inicio),
          datafim: new Date(data_fim),
          receita: receitaBuffer
        }
      });
      return res.status(201).json({ id: medicacao.idmedicacao, message: "Medicação agendada com sucesso" });
    } catch (error) {
      return res.status(400).json({ message: "Erro ao agendar medicação" });
    }
  }

  async administrar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { data_hora } = req.body;
      
      const medicacao = await prisma.medicacao.findUnique({
        where: { idmedicacao: parseInt(id) },
        include: { aluno: true }
      });

      if (!medicacao) {
        return res.status(404).json({ message: "Medicação não encontrada" });
      }

      const admin = await prisma.administracaomedicacao.create({
        data: {
          idmedicacao: parseInt(id),
          idfuncionario: req.user?.tipo_usuario === 'funcionario' ? req.user.id : undefined,
          datahorasysdate: new Date(data_hora || new Date()),
          data: new Date(),
          hora: new Date()
        }
      });

      // Log com o nome da criança
      await prisma.logsistema.create({
        data: {
          acao: "ADMINISTRAR_MEDICACAO",
          entidade: "aluno",
          identidade: medicacao.idaluno,
          idfuncionario: req.user?.tipo_usuario === 'funcionario' ? req.user.id : undefined,
          detalhes: `Medicação ${medicacao.nome} administrada para ${medicacao.aluno?.nome || 'Aluno'}`
        }
      }).catch(() => {});

      return res.status(201).json({ id: admin.idadministracaomedicacao, message: "Medicação administrada" });
    } catch (error) {
      return res.status(400).json({ message: "Erro ao administrar medicação" });
    }
  }

  async getHistoricoAluno(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const historico = await prisma.administracaomedicacao.findMany({
        where: {
          medicacao: {
            idaluno: parseInt(id)
          }
        },
        include: {
          medicacao: true
        },
        orderBy: { datahorasysdate: 'desc' }
      });
      
      const formatado = historico.map(h => ({
        id: h.idadministracaomedicacao,
        descricao: `Administrou: ${h.medicacao?.nome}`,
        observacao: "Administrado com sucesso",
        data_hora: h.datahorasysdate
      }));

      return res.json(formatado);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar histórico de medicação" });
    }
  }
}

export default new MedicacaoController()
