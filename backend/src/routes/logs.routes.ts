import { Router } from "express"
import LogController from "../controllers/LogController"
import { authMiddleware } from "../middlewares/authMiddleware"

const router = Router()

router.get("/", authMiddleware, LogController.listar)

export default router
