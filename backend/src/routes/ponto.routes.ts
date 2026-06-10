import { Router } from "express"
import PontoController from "../controllers/PontoController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { authorizeRole } from "../middlewares/roleMiddleware"

const router = Router()

router.get("/", authMiddleware, authorizeRole('diretor', 'porteiro'), PontoController.listar)
router.post("/entrada", authMiddleware, authorizeRole('diretor', 'porteiro'), PontoController.registrarEntrada)
router.post("/validar-responsavel", authMiddleware, authorizeRole('diretor', 'porteiro'), PontoController.validarResponsavel)
router.post("/saida", authMiddleware, authorizeRole('diretor', 'porteiro'), PontoController.registrarSaida)

export default router
