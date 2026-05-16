import { hash } from 'bcryptjs'

import db from '../db.js'

const [, , username, password] = process.argv

if (!username || !password) {
  console.error('Usage: npm run create-user -- <username> <password>')
  process.exit(1)
}

const passwordHash = await hash(password, 12)

try {
  db.prepare(
    `
      INSERT INTO users (username, password_hash)
      VALUES (?, ?)
    `,
  ).run(username, passwordHash)

  console.log(`User created: ${username}`)
} catch (error) {
  if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
    console.error(`User already exists: ${username}`)
    process.exit(1)
  }

  throw error
}
