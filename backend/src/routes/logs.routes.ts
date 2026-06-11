import { Router } from "express"
import LogController from "../controllers/LogController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { authorizeRole } from "../middlewares/roleMiddleware"

const router = Router()

router.get("/", authMiddleware, authorizeRole('diretor'), LogController.listar)

export default router
