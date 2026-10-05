import { randomBytes, randomUUID, scrypt as scryptCallback, createHash, timingSafeEqual } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCallback)
const sessionLifetimeMs = 7 * 24 * 60 * 60 * 1000
const defaultDbFile = fileURLToPath(new URL('../data/db.json', import.meta.url))

export class DuplicateEmailError extends Error {}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }
}

async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const key = await scrypt(password, salt, 64)
  return `${salt}:${key.toString('hex')}`
}

async function verifyPassword(password, storedHash) {
  const [salt, hex] = storedHash.split(':')
  if (!salt || !hex || hex.length !== 128) return false

  const expected = Buffer.from(hex, 'hex')
  const actual = await scrypt(password, salt, expected.length)
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}

function tokenHash(token) {
  return createHash('sha256').update(token).digest('hex')
}

function createSession(db, userId) {
  const token = randomBytes(32).toString('hex')
  db.sessions = db.sessions.filter((session) => Date.parse(session.expiresAt) > Date.now())
  db.sessions.push({
    tokenHash: tokenHash(token),
    userId,
    expiresAt: new Date(Date.now() + sessionLifetimeMs).toISOString(),
  })
  return token
}

export function createStore(dbFile = process.env.DB_FILE || defaultDbFile) {
  const file = resolve(dbFile)
  let writeQueue = Promise.resolve()

  async function init() {
    await mkdir(dirname(file), { recursive: true })
    try {
      await writeFile(file, JSON.stringify({ users: [], sessions: [] }, null, 2) + '\n', { flag: 'wx' })
    } catch (error) {
      if (error.code !== 'EEXIST') throw error
    }
    await readDb()
  }

  async function readDb() {
    const db = JSON.parse(await readFile(file, 'utf8'))
    if (!Array.isArray(db.users) || !Array.isArray(db.sessions)) {
      throw new Error('JSON bazada users va sessions massivlari bo‘lishi kerak.')
    }
    return db
  }

  async function updateDb(change) {
    const operation = writeQueue.then(async () => {
      const db = await readDb()
      const result = await change(db)
      const temporaryFile = `${file}.${randomUUID()}.tmp`
      await writeFile(temporaryFile, JSON.stringify(db, null, 2) + '\n')
      await rename(temporaryFile, file)
      return result
    })
    writeQueue = operation.catch(() => {})
    return operation
  }

  return {
    init,

    async register({ name, email, password }) {
      const passwordHash = await hashPassword(password)
      return updateDb((db) => {
        if (db.users.some((user) => user.email === email)) throw new DuplicateEmailError()

        const user = {
          id: randomUUID(),
          name,
          email,
          passwordHash,
          createdAt: new Date().toISOString(),
        }
        db.users.push(user)
        return { user: publicUser(user), token: createSession(db, user.id) }
      })
    },

    async login({ email, password }) {
      const db = await readDb()
      const user = db.users.find((item) => item.email === email)
      if (!user || !(await verifyPassword(password, user.passwordHash))) return null

      return updateDb((latestDb) => {
        const currentUser = latestDb.users.find((item) => item.id === user.id)
        if (!currentUser) return null
        return { user: publicUser(currentUser), token: createSession(latestDb, currentUser.id) }
      })
    },

    async findUserByToken(token) {
      const db = await readDb()
      const session = db.sessions.find((item) => item.tokenHash === tokenHash(token) && Date.parse(item.expiresAt) > Date.now())
      if (!session) return null
      const user = db.users.find((item) => item.id === session.userId)
      return user ? publicUser(user) : null
    },

    async logout(token) {
      return updateDb((db) => {
        const before = db.sessions.length
        db.sessions = db.sessions.filter((session) => session.tokenHash !== tokenHash(token))
        return db.sessions.length < before
      })
    },
  }
}
