import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import bcrypt from 'bcryptjs'
import app from '../src/app.js'
import Usuario from '../src/models/usuario.model.js'
import UsuarioRepository from '../src/repositories/usuario.repository.js'

vi.mock('../src/repositories/usuario.repository.js')

beforeEach(async () => {
  vi.resetAllMocks()
  const senhaHash = await bcrypt.hash('123456', 4)
  const ana = new Usuario({ nome: 'Ana', email: 'ana@email.com',
    senhaHash })
  UsuarioRepository.buscarPorEmailComSenha.mockResolvedValue(ana)
})

describe('POST /api/auth/login', () => {
  it('senha certa devolve o token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'ana@email.com', senha: '123456' })

    expect(res.status).toBe(200)
    expect(res.body.token).toBeTypeOf('string')
  })

  it('senha errada responde 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'ana@email.com', senha: 'errada' })

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Email ou senha incorretos.')
  })
})
