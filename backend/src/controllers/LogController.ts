import { Request, Response } from "express"
import prisma from "../database/prisma"

class LogController {
  async listar(req: Request, res: Response) {
    try {
      const { data_inicio, data_fim } = req.query;

      const whereClause: any = {};
      if (data_inicio && data_fim) {
        whereClause.datahorasysdate = {
          gte: new Date(`${data_inicio}T00:00:00Z`),
          lte: new Date(`${data_fim}T23:59:59Z`)
        };
      }

      const logs = await prisma.logsistema.findMany({
        where: whereClause,
        include: { funcionario: true },
        orderBy: { datahorasysdate: 'desc' }
      });

      const formatados = await Promise.all(logs.map(async (l) => {
        let nome_funcionario = l.funcionario?.nome || "Sistema";
        let descricaoAmigavel = l.detalhes || "";

        if (!l.idfuncionario && l.entidade === "Responsavel" && l.identidade) {
          try {
            const resp = await prisma.responsavel.findUnique({ where: { idresponsavel: l.identidade } });
            if (resp) nome_funcionario = resp.nome || "Responsável";
          } catch(e) {}
        }

        if (l.detalhes) {
          try {
            const parsed = JSON.parse(l.detalhes);
            if (parsed.nome_responsavel) nome_funcionario = parsed.nome_responsavel;
            else if (parsed.nome) nome_funcionario = parsed.nome;
            else if (parsed.email) nome_funcionario = parsed.email;
            
            if (l.acao === "LOGIN") {
              descricaoAmigavel = `${nome_funcionario} fez login no sistema.`;
            } else if (l.acao === "ADMINISTRAR_MEDICACAO") {
              descricaoAmigavel = `${nome_funcionario} administrou a medicação ${parsed.medicamento || 'desconhecida'} para a criança ${parsed.aluno || 'desconhecida'}.`;
            } else if (l.acao === "RESPOSTA_COMUNICADO") {
              descricaoAmigavel = `${nome_funcionario} respondeu ao comunicado.`;
            } else {
              const entries = Object.entries(parsed).map(([k,v]) => `${k}: ${v}`).join(', ');
              descricaoAmigavel = `Registro de ${l.acao}: ${entries}`;
            }
          } catch(e) {
            descricaoAmigavel = l.detalhes;
          }
        } else {
           descricaoAmigavel = `Ação ${l.acao} realizada em ${l.entidade}`;
        }
        
        return {
          id: l.idlog,
          acao: l.acao,
          descricao: descricaoAmigavel,
          tipo: l.entidade,
          nome_funcionario: nome_funcionario,
          data_hora: l.datahorasysdate
        };
      }));

      return res.json(formatados);
    } catch (error) {
      console.error("Erro ao buscar logs:", error);
      return res.status(500).json({ message: "Erro ao buscar logs" });
    }
  }
}

export default new LogController()
