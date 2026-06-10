import { Router } from "express"
import MedicacaoController from "../controllers/MedicacaoController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { upload } from "../middlewares/uploadMiddleware"

const router = Router()

router.get("/meus", authMiddleware, MedicacaoController.getMinhasMedicacoes)
router.get("/aluno/:id", authMiddleware, MedicacaoController.getByAluno)
router.get("/aluno/:id/historico", authMiddleware, MedicacaoController.getHistoricoAluno)
router.post("/agendar", authMiddleware, upload.single("receita"), MedicacaoController.agendar)
router.post("/:id/administrar", authMiddleware, MedicacaoController.administrar)

export default router
