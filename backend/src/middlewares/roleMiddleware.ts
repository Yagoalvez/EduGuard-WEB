import { Request, Response, NextFunction } from "express";

export function authorizeType(...allowedTypes: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedTypes.includes(req.user.tipo_usuario)) {
      return res.status(403).json({ message: "Acesso negado." });
    }
    next();
  };
}

export function authorizeRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({ message: "Acesso negado." });
    }
    
    // Responsáveis não possuem roles específicas de funcionário
    if (req.user.tipo_usuario === 'responsavel') {
      return res.status(403).json({ message: "Acesso negado. Apenas funcionários permitidos." });
    }

    if (!allowedRoles.includes(req.user.funcao.toLowerCase())) {
      return res.status(403).json({ message: "Acesso negado para este perfil." });
    }
    next();
  };
}
