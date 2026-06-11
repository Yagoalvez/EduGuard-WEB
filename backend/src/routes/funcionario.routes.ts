import { Router } from "express"
import FuncionarioController from "../controllers/FuncionarioController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { upload } from "../middlewares/uploadMiddleware"
import { authorizeRole } from "../middlewares/roleMiddleware"

const router = Router()

router.get("/", authMiddleware, FuncionarioController.listar)
router.get("/funcoes", authMiddleware, FuncionarioController.listarFuncoes)
router.post("/", authMiddleware, authorizeRole('diretor'), upload.single("foto"), FuncionarioController.criar)
router.put("/:id", authMiddleware, authorizeRole('diretor'), upload.single("foto"), FuncionarioController.atualizar)
router.patch("/:id/status", authMiddleware, authorizeRole('diretor'), FuncionarioController.alterarStatus)
router.delete("/:id", authMiddleware, authorizeRole('diretor'), FuncionarioController.desativar)

export default router
