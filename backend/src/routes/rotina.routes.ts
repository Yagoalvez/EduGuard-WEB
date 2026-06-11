import { Router } from "express"
import RotinaController from "../controllers/RotinaController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { authorizeRole } from "../middlewares/roleMiddleware"

const router = Router()

router.get("/", authMiddleware, RotinaController.listar)
router.get("/aluno/:id", authMiddleware, RotinaController.listarPorAluno)
router.post("/", authMiddleware, authorizeRole('diretor', 'coordenador', 'professor'), RotinaController.registrar)
router.put("/:id", authMiddleware, authorizeRole('diretor', 'coordenador', 'professor'), RotinaController.corrigir)

export default router
