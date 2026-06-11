import { Router } from "express"

import ResponsavelController from "../controllers/ResponsavelController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { upload } from "../middlewares/uploadMiddleware"
import { authorizeRole } from "../middlewares/roleMiddleware"

const router = Router()

router.get("/", authMiddleware, ResponsavelController.listar)
router.get("/:id", authMiddleware, ResponsavelController.buscarPorId)
router.post("/", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), upload.single("foto"), ResponsavelController.criar)
router.put("/:id", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), upload.single("foto"), ResponsavelController.atualizar)
router.patch("/:id/status", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), ResponsavelController.alterarStatus)
router.delete("/:id", authMiddleware, authorizeRole('diretor'), ResponsavelController.desativar)
router.post("/:id/alunos", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), ResponsavelController.vincularAluno)
router.delete("/:id/alunos/:idAluno", authMiddleware, authorizeRole('diretor', 'coordenador', 'secretario', 'secretário'), ResponsavelController.desvincularAluno)

router.get("/me", authMiddleware, ResponsavelController.perfil)
router.get("/me/alunos", authMiddleware, ResponsavelController.listarMeusAlunos)
router.get("/me/alunos-com-turma", authMiddleware, ResponsavelController.listarAlunosComTurma)
router.put("/me", authMiddleware, ResponsavelController.atualizarPerfil)
router.post("/secundario", authMiddleware, ResponsavelController.criarSecundario)
router.patch("/me/foto", authMiddleware, upload.single("foto"), ResponsavelController.atualizarFoto)
export default router