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

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
