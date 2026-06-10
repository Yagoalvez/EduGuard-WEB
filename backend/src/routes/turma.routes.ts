import { Router } from "express"
import TurmaController from "../controllers/TurmaController"
import { authMiddleware } from "../middlewares/authMiddleware"

const router = Router()

router.get("/", authMiddleware, TurmaController.listar)
router.post("/", authMiddleware, TurmaController.criar)
router.get("/:id", authMiddleware, TurmaController.buscarPorId)
router.post("/:id/alunos", authMiddleware, TurmaController.enturmar)
router.delete("/:id/alunos/:idaluno", authMiddleware, TurmaController.removerAluno)
router.put("/:id", authMiddleware, TurmaController.atualizar)
router.delete("/:id", authMiddleware, TurmaController.deletar)
router.patch("/:id/status", authMiddleware, TurmaController.alterarStatus)

export default router
