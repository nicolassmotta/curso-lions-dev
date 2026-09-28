import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'
import Usuario from '../src/models/usuario.model.js'
import UsuarioRepository from '../src/repositories/usuario.repository.js'

vi.mock('../src/repositories/usuario.repository.js')

beforeEach(() => {
  vi.resetAllMocks()
})

describe('POST /api/auth/cadastro', () => {
  it('cadastra e não devolve a senha', async () => {
    UsuarioRepository.buscarPorEmail.mockResolvedValue(null)
    UsuarioRepository.criar.mockImplementation(
      async (dados) => new Usuario(dados)
    )

    const res = await request(app)
      .post('/api/auth/cadastro')
      .send({ nome: 'Ana', email: 'Ana@Email.com', senha: '123456' })

    expect(res.status).toBe(201)
    expect(res.body.usuario.email).toBe('ana@email.com')
    expect(res.body.usuario).not.toHaveProperty('senhaHash')
    expect(res.body.token).toBeTypeOf('string')
  })

  it('email repetido responde 409', async () => {
    const ana = new Usuario({ nome: 'Ana', email: 'ana@email.com' })
    UsuarioRepository.buscarPorEmail.mockResolvedValue(ana)

    const res = await request(app)
      .post('/api/auth/cadastro')
      .send({ nome: 'Ana', email: 'ana@email.com', senha: '123456' })

    expect(res.status).toBe(409)
    expect(UsuarioRepository.criar).not.toHaveBeenCalled()
  })
})
