import { Router } from "express"
import AlunoController from "../controllers/AlunoController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { upload } from "../middlewares/uploadMiddleware"
import { authorizeRole } from "../middlewares/roleMiddleware"

const router = Router()

router.get("/meus", authMiddleware, AlunoController.getMeusAlunos)
router.get("/", authMiddleware, AlunoController.listarTodos)
router.get("/:id", authMiddleware, AlunoController.buscarPorId)
router.post("/", authMiddleware, upload.single("foto"), AlunoController.criar)
router.put("/:id", authMiddleware, upload.single("foto"), AlunoController.atualizar)
router.patch("/:id/status", authMiddleware, AlunoController.alterarStatus)
router.delete("/:id", authMiddleware, authorizeRole('diretor'), AlunoController.desativar)

router.post("/:id/responsaveis", authMiddleware, AlunoController.vincularResponsavel)
router.delete("/:id/responsaveis/:idResp", authMiddleware, AlunoController.desvincularResponsavel)

export default router
