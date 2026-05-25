import bcrypt from 'bcryptjs'
import { Router } from 'express'
import jwt from 'jsonwebtoken'

import db from './db.js'

const router = Router()
const { compare } = bcrypt
const { sign } = jwt

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-production'
const JWT_EXPIRES_IN = '7d'

interface User {
  id: string
  username: string
  password_hash: string
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string }

  if (!username || !password) {
    res.status(400).json({ message: 'username 和 password 不能为空' })
    return
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User | undefined

  if (!user) {
    res.status(401).json({ message: '用户名或密码错误' })
    return
  }

  const valid = await compare(password, user.password_hash)

  if (!valid) {
    res.status(401).json({ message: '用户名或密码错误' })
    return
  }

  const token = sign({ sub: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })

  res.json({ token })
})

export default router
