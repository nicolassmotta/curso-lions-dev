import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

describe('POST /api/auth/cadastro: validação', () => {
  it('sem nome responde 400', async () => {
    const res = await request(app)
      .post('/api/auth/cadastro')
      .send({ email: 'ana@email.com', senha: '123456' })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe("O campo 'nome' é obrigatório.")
  })

  it('sem senha responde 400', async () => {
    const res = await request(app)
      .post('/api/auth/cadastro')
      .send({ nome: 'Ana', email: 'ana@email.com' })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe("O campo 'senha' é obrigatório.")
  })
})
