import { Router } from "express"

import AvisoController from "../controllers/AvisoController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { authorizeRole, excludeRole } from "../middlewares/roleMiddleware"

const router = Router()

router.get("/", authMiddleware, AvisoController.listar)
router.post("/", authMiddleware, authorizeRole('diretor', 'coordenador', 'professor'), AvisoController.criar)
router.put("/:id", authMiddleware, authorizeRole('diretor', 'coordenador', 'professor'), AvisoController.atualizar)
router.delete("/:id", authMiddleware, authorizeRole('diretor', 'coordenador'), AvisoController.excluir)
router.post("/avisos/:id/responder", authMiddleware, excludeRole('porteiro'), AvisoController.responder)

export default router