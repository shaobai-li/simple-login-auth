import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const { verify } = jwt

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-production'

interface AuthTokenPayload {
  sub?: string | number
  username?: unknown
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        username?: string
      }
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization

  if (!authorization?.startsWith('Bearer ')) {
    res.status(401).json({ message: '缺少登录 token' })
    return
  }

  const token = authorization.slice('Bearer '.length).trim()

  if (!token) {
    res.status(401).json({ message: '缺少登录 token' })
    return
  }

  try {
    const payload = verify(token, JWT_SECRET)

    if (typeof payload === 'string' || !payload.sub) {
      res.status(401).json({ message: '无效的登录 token' })
      return
    }

    const { sub, username } = payload as AuthTokenPayload

    if (typeof sub !== 'string' || !sub) {
      res.status(401).json({ message: '无效的登录 token' })
      return
    }

    req.user = {
      id: sub,
      username: typeof username === 'string' ? username : undefined,
    }

    next()
  } catch {
    res.status(401).json({ message: '无效或已过期的登录 token' })
  }
}
