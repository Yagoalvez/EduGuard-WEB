import { Router } from "express"

import AvisoController from "../controllers/AvisoController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { authorizeRole } from "../middlewares/roleMiddleware"

const router = Router()

router.get("/", authMiddleware, AvisoController.listar)
router.post("/", authMiddleware, AvisoController.criar)
router.put("/:id", authMiddleware, AvisoController.atualizar)
router.delete("/:id", authMiddleware, authorizeRole('diretor', 'coordenador'), AvisoController.excluir)
router.post("/avisos/:id/responder", authMiddleware, AvisoController.responder)

export default router