import express from 'express'

import './db.js'
import authRouter from './auth.js'
import { requireAuth } from './middleware/auth.js'

const app = express()
const port = 3000

app.use(express.json())

app.use('/api', authRouter)

app.get('/api/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

app.get('/', (req, res) => {
  res.send('Server is running')
})

if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET 环境变量未设置，正在使用不安全的默认密钥，请通过环境变量设置 JWT_SECRET')
}

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
