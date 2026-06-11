import { Router } from "express"
import TurmaController from "../controllers/TurmaController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { authorizeRole } from "../middlewares/roleMiddleware"

const router = Router()

router.get("/", authMiddleware, TurmaController.listar)
router.post("/", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), TurmaController.criar)
router.get("/:id", authMiddleware, TurmaController.buscarPorId)
router.post("/:id/alunos", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), TurmaController.enturmar)
router.delete("/:id/alunos/:idaluno", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), TurmaController.removerAluno)
router.put("/:id", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), TurmaController.atualizar)
router.delete("/:id", authMiddleware, authorizeRole('diretor'), TurmaController.deletar)
router.patch("/:id/status", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), TurmaController.alterarStatus)

export default router
