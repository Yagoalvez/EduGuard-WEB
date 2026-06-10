import { Router } from "express"
import RotinaController from "../controllers/RotinaController"
import { authMiddleware } from "../middlewares/authMiddleware"

const router = Router()

router.get("/", authMiddleware, RotinaController.listar)
router.get("/aluno/:id", authMiddleware, RotinaController.listarPorAluno)
router.post("/", authMiddleware, RotinaController.registrar)
router.put("/:id", authMiddleware, RotinaController.corrigir)

export default router
