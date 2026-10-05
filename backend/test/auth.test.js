import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { once } from 'node:events'
import { readFile, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { createApp } from '../src/app.js'
import { createStore } from '../src/store.js'

test('register, login, session va JSON saqlash oqimi', async () => {
  const dbFile = fileURLToPath(new URL(`../data/test-${randomUUID()}.json`, import.meta.url))
  const store = createStore(dbFile)
  await store.init()
  const server = createApp(store).listen(0, '127.0.0.1')
  await once(server, 'listening')
  const baseUrl = `http://127.0.0.1:${server.address().port}`

  async function post(path, body, token) {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    })
    return { status: response.status, data: await response.json() }
  }

  try {
    const health = await fetch(`${baseUrl}/api/health`)
    assert.equal(health.status, 200)

    const invalid = await post('/api/auth/register', { name: 'A', email: 'bad', password: 'short' })
    assert.equal(invalid.status, 400)

    const registered = await post('/api/auth/register', {
      name: 'Test User',
      email: 'Test@Example.com',
      password: 'strong-password-123',
    })
    assert.equal(registered.status, 201)
    assert.equal(registered.data.user.email, 'test@example.com')
    assert.equal(registered.data.token.length, 64)
    assert.equal('passwordHash' in registered.data.user, false)

    const saved = JSON.parse(await readFile(dbFile, 'utf8'))
    assert.equal(saved.users.length, 1)
    assert.notEqual(saved.users[0].passwordHash, 'strong-password-123')
    assert.notEqual(saved.sessions[0].tokenHash, registered.data.token)

    const duplicate = await post('/api/auth/register', {
      name: 'Other User',
      email: 'TEST@example.com',
      password: 'another-password-123',
    })
    assert.equal(duplicate.status, 409)

    const incorrect = await post('/api/auth/login', { email: 'test@example.com', password: 'wrong-password' })
    assert.equal(incorrect.status, 401)

    const reloadedStore = createStore(dbFile)
    await reloadedStore.init()
    const login = await post('/api/auth/login', { email: 'test@example.com', password: 'strong-password-123' })
    assert.equal(login.status, 200)
    assert.equal(login.data.user.name, 'Test User')

    const me = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${login.data.token}` },
    })
    assert.equal(me.status, 200)
    assert.equal((await me.json()).user.id, login.data.user.id)

    const logout = await post('/api/auth/logout', {}, login.data.token)
    assert.equal(logout.status, 200)

    const afterLogout = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${login.data.token}` },
    })
    assert.equal(afterLogout.status, 401)

    const persistedUser = await reloadedStore.findUserByToken(registered.data.token)
    assert.equal(persistedUser.id, registered.data.user.id)
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
    await rm(dbFile, { force: true })
  }
})
