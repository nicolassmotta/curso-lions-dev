import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../src/app.js'
import Usuario from '../src/models/usuario.model.js'
import UsuarioRepository from '../src/repositories/usuario.repository.js'

vi.mock('../src/repositories/usuario.repository.js')

const ana = new Usuario({ nome: 'Ana', email: 'ana@email.com' })
const id = ana._id.toString()
const token = jwt.sign({ id, email: ana.email }, process.env.JWT_SECRET)

beforeEach(() => {
  vi.resetAllMocks()
})

describe('GET /api/usuarios/perfil com token', () => {
  it('devolve o usuário do token', async () => {
    UsuarioRepository.buscarPorId.mockResolvedValue(ana)

    const res = await request(app)
      .get('/api/usuarios/perfil')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.usuario.nome).toBe('Ana')
    expect(UsuarioRepository.buscarPorId).toHaveBeenCalledWith(id)
  })

  it('usuário apagado responde 404', async () => {
    UsuarioRepository.buscarPorId.mockResolvedValue(null)

    const res = await request(app)
      .get('/api/usuarios/perfil')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(404)
  })
})
