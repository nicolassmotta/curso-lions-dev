import { it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

it('sem body responde 400, não 500', async () => {
  const res = await request(app)
    .post('/api/auth/cadastro')

  expect(res.status).toBe(400)
})
