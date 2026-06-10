import { Router } from "express"

import responsavelRoutes from "./responsavel.routes"
import authRoutes from "./auth.routes"
import avisoRoutes from "./aviso.routes"
import entradaSaidaRoutes from "./entradaSaida.routes"
import checklistRoutes from "./checklist.routes"
import notificacaoRoutes from "./notificacao.routes"
import alunoRoutes from "./aluno.routes"
import funcionarioRoutes from "./funcionario.routes"
import turmaRoutes from "./turma.routes"
import pontoRoutes from "./ponto.routes"
import rotinaRoutes from "./rotina.routes"
import logsRoutes from "./logs.routes"

const router = Router()

router.use("/usuarios", funcionarioRoutes)
router.use("/turmas", turmaRoutes)
router.use("/ponto", pontoRoutes)
router.use("/rotina", rotinaRoutes)
router.use("/responsaveis", responsavelRoutes)

router.use("/auth", authRoutes)
router.use("/comunicacao", avisoRoutes)
router.use("/entrada-saida", entradaSaidaRoutes)
router.use("/checklists", checklistRoutes)
router.use("/notificacoes", notificacaoRoutes)
router.use("/alunos", alunoRoutes)
router.use("/logs", logsRoutes)

router.get("/", (req, res) => {return res.json({
    message: "API EduGuard online"})
})

export default router