import { Request, Response, NextFunction } from "express"

import AuthService from "../services/AuthService"

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, cpf, senha } = req.body

      const loginValue = login || cpf;

      const result = await AuthService.login(loginValue, senha)

      return res.json(result)
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()