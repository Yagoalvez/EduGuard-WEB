import { Router } from "express"
import AlunoController from "../controllers/AlunoController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { upload } from "../middlewares/uploadMiddleware"
import { authorizeRole } from "../middlewares/roleMiddleware"

const router = Router()

router.get("/meus", authMiddleware, AlunoController.getMeusAlunos)
router.get("/", authMiddleware, AlunoController.listarTodos)
router.get("/:id", authMiddleware, AlunoController.buscarPorId)
router.post("/", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), upload.single("foto"), AlunoController.criar)
router.put("/:id", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), upload.single("foto"), AlunoController.atualizar)
router.patch("/:id/status", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), AlunoController.alterarStatus)
router.delete("/:id", authMiddleware, authorizeRole('diretor'), AlunoController.desativar)

router.post("/:id/responsaveis", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), AlunoController.vincularResponsavel)
router.delete("/:id/responsaveis/:idResp", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), AlunoController.desvincularResponsavel)

export default router
