import { Request, Response } from "express"
import prisma from "../database/prisma"

class AvisoController {
  async listar(req: Request, res: Response) {
    try {
      let avisos = [];
      if (req.user?.tipo_usuario === 'responsavel') {
        const idResponsavel = req.user.id;
        // Fetch turmas do responsavel
        const vinculos = await prisma.responsavelaluno.findMany({
          where: { idresponsavel: idResponsavel },
          include: { aluno: { include: { enturmacao: true } } }
        });
        const idsTurmas = vinculos.flatMap(v => v.aluno.enturmacao.map(e => e.idturma));
        
        avisos = await prisma.aviso.findMany({
          where: {
            OR: [
              { idturma: null, avisoresponsavel: { none: {} } }, // geral
              { idturma: { in: idsTurmas } }, // turma
              { avisoresponsavel: { some: { idresponsavel: idResponsavel } } } // especifico
            ]
          },
          include: { turma: true, respostacomunicado: { include: { responsavel: true } } },
          orderBy: { datacadastro: 'desc' }
        });
      } else {
        avisos = await prisma.aviso.findMany({
          include: { turma: true, respostacomunicado: { include: { responsavel: true } }, avisoresponsavel: true },
          orderBy: { datacadastro: 'desc' }
        });
      }

      const formatados = avisos.map(a => ({
        id: a.idaviso,
        titulo: a.titulo,
        conteudo: a.descricao,
        data_publicacao: a.datacadastro,
        id_turma: a.idturma,
        turma_nome: a.turma?.codigoturma,
        responsaveis_ids: a.avisoresponsavel?.map(ar => ar.idresponsavel) || [],
        aluno_nome: a.avisoresponsavel?.length > 0 ? "Responsáveis Específicos" : null,
        respostas: a.respostacomunicado.map(r => ({
          id: r.idrespostacomunicado,
          nome_responsavel: r.responsavel?.nome,
          mensagem: r.mensagem,
          data_hora: r.datahorasysdate
        }))
      }));

      return res.json(formatados);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar comunicados" });
    }
  }

  async criar(req: Request, res: Response) {
    try {
      const { titulo, conteudo, id_turma, responsaveis } = req.body;
      const aviso = await prisma.aviso.create({
        data: {
          titulo,
          descricao: conteudo,
          idturma: id_turma ? parseInt(id_turma) : null,
          datacadastro: new Date()
        }
      });

      if (responsaveis && responsaveis.length > 0) {
        await prisma.avisoresponsavel.createMany({
          data: responsaveis.map((idR: any) => ({
            idaviso: aviso.idaviso,
            idresponsavel: parseInt(idR)
          }))
        });
      }

      // Log
      const loggedUser = req.user;
      const actor = loggedUser?.tipo_usuario === 'funcionario'
        ? (await prisma.funcionario.findUnique({ where: { idfuncionario: loggedUser.id } }))?.nome || "Funcionário"
        : "Sistema";
      await prisma.logsistema.create({
        data: {
          acao: "CRIAR_COMUNICADO",
          entidade: "Comunicado",
          identidade: aviso.idaviso,
          idfuncionario: loggedUser?.tipo_usuario === 'funcionario' ? loggedUser.id : null,
          detalhes: `${actor} criou o comunicado '${aviso.titulo}'.`
        }
      }).catch(() => {});

      return res.status(201).json({ id: aviso.idaviso, message: "Aviso criado" });
    } catch (error) {
      return res.status(400).json({ message: "Erro ao criar aviso" });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { titulo, conteudo, id_turma, responsaveis } = req.body;
      
      const aviso = await prisma.aviso.update({
        where: { idaviso: parseInt(id) },
        data: {
          titulo,
          descricao: conteudo,
          idturma: id_turma ? parseInt(id_turma) : null,
        }
      });

      if (responsaveis) {
        await prisma.avisoresponsavel.deleteMany({ where: { idaviso: parseInt(id) } });
        if (responsaveis.length > 0) {
          await prisma.avisoresponsavel.createMany({
            data: responsaveis.map((idR: any) => ({
              idaviso: parseInt(id),
              idresponsavel: parseInt(idR)
            }))
          });
        }
      }

      // Log
      const loggedUser = req.user;
      const actor = loggedUser?.tipo_usuario === 'funcionario'
        ? (await prisma.funcionario.findUnique({ where: { idfuncionario: loggedUser.id } }))?.nome || "Funcionário"
        : "Sistema";
      await prisma.logsistema.create({
        data: {
          acao: "EDITAR_COMUNICADO",
          entidade: "Comunicado",
          identidade: aviso.idaviso,
          idfuncionario: loggedUser?.tipo_usuario === 'funcionario' ? loggedUser.id : null,
          detalhes: `${actor} editou o comunicado '${aviso.titulo}'.`
        }
      }).catch(() => {});

      return res.json({ message: "Aviso updated" });
    } catch (error) {
      return res.status(400).json({ message: "Erro ao atualizar aviso" });
    }
  }

  async responder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { mensagem } = req.body;
      const idResponsavel = req.user?.id;

      if (!idResponsavel || req.user?.tipo_usuario !== 'responsavel') {
        return res.status(403).json({ message: "Apenas responsáveis podem responder a comunicados" });
      }

      await prisma.respostacomunicado.create({
        data: {
          idaviso: parseInt(id),
          idresponsavel: idResponsavel,
          mensagem: mensagem,
          datahorasysdate: new Date()
        }
      });

      // Log
      const responsavel = await prisma.responsavel.findUnique({ where: { idresponsavel: idResponsavel } });
      const avisoObj = await prisma.aviso.findUnique({ where: { idaviso: parseInt(id) } });
      await prisma.logsistema.create({
        data: {
          acao: "RESPOSTA_COMUNICADO",
          entidade: "Comunicado",
          identidade: parseInt(id),
          detalhes: `${responsavel?.nome || "Responsável"} respondeu ao comunicado '${avisoObj?.titulo || "desconhecido"}'.`
        }
      }).catch(() => {});

      return res.status(201).json({ message: "Resposta enviada com sucesso" });
    } catch (error) {
      return res.status(400).json({ message: "Erro ao enviar resposta" });
    }
  }

  async excluir(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const loggedUser = req.user;
      
      const avisoExistente = await prisma.aviso.findUnique({
        where: { idaviso: parseInt(id) }
      });
      if (!avisoExistente) {
        return res.status(404).json({ message: "Comunicado não encontrado." });
      }

      await prisma.aviso.delete({
        where: { idaviso: parseInt(id) }
      });

      // Log
      await prisma.logsistema.create({
        data: {
          acao: "EXCLUIR_COMUNICADO",
          entidade: "Comunicado",
          identidade: parseInt(id),
          idfuncionario: loggedUser?.id,
          detalhes: `Comunicado "${avisoExistente.titulo}" excluído.`
        }
      }).catch(() => {});

      return res.json({ message: "Registro removido com sucesso." });
    } catch (error) {
      return res.status(400).json({ message: "Não foi possível remover este registro." });
    }
  }
}

export default new AvisoController();